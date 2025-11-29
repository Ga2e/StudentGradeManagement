## 基于 Spring boot + React 的学生学籍管理系统
## 说明
  本项目是于2025年河北外国语学院的软件工程专业毕业设计
  目前是非完成品，后端还有两个模块没有完成，因为对前端知识掌握的不牢靠，剩下的工作还剩不少
### 技术栈
  - 前端:       React v6 + antd 
  - 后端:       Spring + Spring Boot 3
  - 权限认证:   Spring Security
  - 数据库:     Spring JPA + Mysql + Redis 
  - AI:         Spring AI
### Backend Project Construct
```

.
├── common
│   ├── constant        
│   ├── exception       // 自定义异常
│   ├── response        // 响应体
│   └── utils           // 工具类
├── config              // 配置类
└── module              // 模块
    ├── Captcha
    ├── Class
    ├── Course
    ├── Grade
    ├── Institute
    ├── Professional
    ├── Student
    ├── Teacher
    └── User
```
### Frontend Project Construct 
```

.
├── assets
├── component       // 业务组件
├── constant        // 全局定义
├── context         // 全局上下文
├── icon          
│   └── Bell
├── pages           // 页面（按照角色分类）
│   ├── admin
│   ├── student
│   └── teacher
└── service


```    


### Require
  - Java:       21
  - Maven:      3^
  - node:       22^
  - Mysql:      8.0
### start
  - git clone https://github.com/Ga2e/StudentGradeManagement.git
  - cd ./StudentGradeManagement/frontend
  - npm run dev
  - cd ../backend/
  - 数据库Schema: ./src/main/resources/gradeManage.sql
  - mvn spring-boot:run


