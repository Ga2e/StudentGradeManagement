import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordChecker {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = "$2a$10$shE2geCPkGP0SMx2yiY8C.HTTOOEm7j1RB8zj4AmPk5eD71B88YPe";
        String rawPassword = "202401";
        
        boolean matches = encoder.matches(rawPassword, encodedPassword);
        System.out.println("Password matches: " + matches);
    }
}