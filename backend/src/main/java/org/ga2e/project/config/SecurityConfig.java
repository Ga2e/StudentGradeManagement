package org.ga2e.project.config;

import java.util.List;

import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.repo.UserRepo;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

  private final UserRepo userRepo;
  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity hSecurity) throws Exception {
    hSecurity
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(configurationSource()))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests((request) -> request
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().permitAll())
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .formLogin(form -> form.disable())
        .httpBasic(basic -> basic.disable());
    return hSecurity.build();
  }

  @Bean
  CorsConfigurationSource configurationSource() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedOrigins(List.of(
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;
  }

  @Bean
  UserDetailsService userDetailsService() {
    return new UserDetailsService() {

      // 支持多方式登陆； 邮箱，手机号，工号/学号
      @Override
      public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user;
        user = userRepo.findByPhone(username);
        if (user != null) {
          return user;
        }

        user = userRepo.findByCode(username);
        if (user != null) {
          return user;
        }

        user = userRepo.findByEmail(username);
        if (user != null) {
          return user;
        }

        throw new UsernameNotFoundException("user not found");

      }

    };
  }

  @Bean
  AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder, UserDetailsService userDetailsService) {
    DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider(userDetailsService);
    daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
    return new ProviderManager(daoAuthenticationProvider);
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
