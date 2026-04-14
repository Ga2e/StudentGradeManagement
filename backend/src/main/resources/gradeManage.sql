DROP DATABASE grade_manage;
CREATE DATABASE  grade_manage
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
use grade_manage;

CREATE TABLE role (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE COMMENT '角色名',
    
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- 学生
CREATE TABLE user (
    id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_id     BIGINT UNSIGNED NOT NULL,
    code       VARCHAR(20)   NOT NULL UNIQUE COMMENT '学号/工号',
    email      VARCHAR(255)  NOT NULL UNIQUE COMMENT '登录邮箱，RFC 5321 ≤254',
    phone      VARCHAR(20)   NULL     COMMENT '手机号，可选',
    password   VARCHAR(255)  NOT NULL COMMENT '密码哈希（bcrypt/argon2）',
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_usr_role FOREIGN KEY (role_id) REFERENCES `role`(id) ,

    -- 索引优化
    INDEX idx_code  (code),
    INDEX idx_email (email),
    INDEX idx_phone (phone)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='用户表';




CREATE TABLE permission (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE COMMENT '权限标识',
    name VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE role_permission (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_id BIGINT UNSIGNED NOT NULL,
    permission_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_rp_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    CONSTRAINT fk_rp_perm FOREIGN KEY (permission_id) REFERENCES permission(id) ON DELETE CASCADE,
    UNIQUE INDEX uk_role_perm (role_id, permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE student_profile (
    user_id BIGINT UNSIGNED PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    gender ENUM('男','女','其他') DEFAULT NULL,
    birthday DATE NULL,
    enrollment_year YEAR NOT NULL COMMENT '入学年份',
    expected_graduation YEAR NULL,
    avatar VARCHAR(255) NULL,
    id_card VARCHAR(18) NULL COMMENT '身份证号（加密存储）',
    CONSTRAINT fk_sp_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 教师扩展表（一对一）
CREATE TABLE teacher_profile (
    user_id BIGINT UNSIGNED PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    gender ENUM('男','女','其他') DEFAULT NULL,
    title VARCHAR(30) NULL COMMENT '职称：助教/讲师/副教授/教授',
    degree VARCHAR(30) NULL COMMENT '最高学历',
    office_room VARCHAR(50) NULL COMMENT '办公室',
    hire_date DATE NULL COMMENT '入职日期',
    avatar VARCHAR(255) NULL,
    CONSTRAINT fk_tp_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;





-- 1. 学院表
CREATE TABLE institute (
    id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL                  COMMENT '学院名称',
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学院表';

-- 2. 专业表
CREATE TABLE professional (
    id             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(100) NOT NULL                  COMMENT '专业名称',
    institute_id   BIGINT UNSIGNED NOT NULL               COMMENT '所属学院',
    created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_prof_institute
        FOREIGN KEY (institute_id) REFERENCES institute(id)
        ON DELETE RESTRICT,

    INDEX idx_institute (institute_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='专业表';

-- 3. 班级表
CREATE TABLE class (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(50)  NOT NULL                  COMMENT '班级名称，如 2021计科1班',
    year            INT          NOT NULL                  COMMENT '入学年份',
    professional_id BIGINT UNSIGNED NOT NULL               COMMENT '所属专业',
    created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_class_professional
        FOREIGN KEY (professional_id) REFERENCES professional(id)
        ON DELETE RESTRICT,

    UNIQUE INDEX uk_name_year (name, year),
    INDEX idx_professional (professional_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='行政班级表';


-- 4. 学期表
CREATE TABLE term (
    id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(50)  NOT NULL                         COMMENT '学期名称',
    start_date DATE         NOT NULL,
    end_date   DATE         NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_date_range (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学期表';




CREATE TABLE course (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE COMMENT '课程号',
    name VARCHAR(100) NOT NULL,
    credits DECIMAL(3,1) NOT NULL DEFAULT 0 COMMENT '学分',
    hours TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '学时',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE course_open (
      id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      course_id BIGINT UNSIGNED NOT NULL,
      user_id BIGINT UNSIGNED NOT NULL COMMENT '开课教师',
      CONSTRAINT fk_course_teacher FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE RESTRICT,
      CONSTRAINT fk_co_course FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE RESTRICT

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 成绩表
CREATE TABLE grade (
    id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id   BIGINT UNSIGNED NOT NULL               COMMENT '学生ID',
    course_id    BIGINT UNSIGNED NOT NULL               COMMENT '课程ID',
    score        DECIMAL(5,2)    NOT NULL COMMENT '分数' ,
    created_at   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 外键
    CONSTRAINT fk_grade_student 
        FOREIGN KEY (user_id) REFERENCES user(id) 
        ON DELETE RESTRICT,
    CONSTRAINT fk_grade_course 
        FOREIGN KEY (course_id) REFERENCES course(id) 
        ON DELETE RESTRICT,

    -- 索引
    UNIQUE INDEX uk_student_course (user_id, course_id) COMMENT '一人一课一成绩',
    INDEX idx_score (score),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生成绩表';




-- 4. 选课记录表（elective_course）
CREATE TABLE elective_course (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id  BIGINT UNSIGNED NOT NULL              COMMENT '学生ID',
    course_id   BIGINT UNSIGNED NOT NULL              COMMENT '课程ID',
    term_id     BIGINT UNSIGNED NOT NULL              COMMENT '学期ID',

    -- 外键
    CONSTRAINT fk_elective_student
        FOREIGN KEY (user_id) REFERENCES user(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_elective_course
        FOREIGN KEY (course_id) REFERENCES course(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_elective_term
        FOREIGN KEY (term_id) REFERENCES term(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,

    -- 唯一约束：防止重复选课
    UNIQUE INDEX uk_student_course_term (user_id, course_id, term_id),

    -- 索引
    INDEX idx_student (user_id),
    INDEX idx_course (course_id),
    INDEX idx_term (term_id),

    -- 审计字段
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='选课记录表';






CREATE TABLE major_course (
    id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    class_id   BIGINT UNSIGNED NOT NULL               COMMENT '班级',
    course_id  BIGINT UNSIGNED NOT NULL               COMMENT '课程',
    term_id    BIGINT UNSIGNED NOT NULL               COMMENT '学期',

    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_mc_class
        FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE CASCADE,
    CONSTRAINT fk_mc_course
        FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE RESTRICT,
    CONSTRAINT fk_mc_term
        FOREIGN KEY (term_id) REFERENCES term(id) ON DELETE RESTRICT,

    UNIQUE INDEX uk_class_course_term (class_id, course_id, term_id),
    INDEX idx_term (term_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='班级专业必修课表';



-- 通知表
CREATE TABLE notify (
    id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT UNSIGNED NOT NULL               COMMENT '相关学生',
    grade_id     BIGINT UNSIGNED NOT NULL               COMMENT '关联成绩',
    message      TEXT            NULL                   COMMENT '通知内容',
    is_read      TINYINT(1)      NOT NULL DEFAULT 0     COMMENT '0未读 1已读',
    notified_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- 外键
    CONSTRAINT fk_notify_grade 
        FOREIGN KEY (grade_id) REFERENCES grade(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_notify_user 
        FOREIGN KEY (user_id) REFERENCES user(id) 
        ON DELETE CASCADE,


    -- 索引
    INDEX idx_grade_id (grade_id),
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_notified (notified_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='成绩通知表';

-- 1. 入学记录表（enrollment）
CREATE TABLE enrollment (
    id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id   BIGINT UNSIGNED NOT NULL COMMENT '学生ID',
    class_id     BIGINT UNSIGNED NOT NULL COMMENT '班级ID',

    -- 外键（假设 student 和 class 表存在）
    CONSTRAINT fk_enrollment_student
        FOREIGN KEY (user_id) REFERENCES user(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_enrollment_class
        FOREIGN KEY (class_id) REFERENCES class(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,

    -- 唯一约束：一个学生只能在一个班级入学一次
    UNIQUE INDEX uk_student_class (user_id, class_id),

    -- 索引
    INDEX idx_student (user_id),
    INDEX idx_class (class_id),

    -- 审计字段（企业标准）
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='入学记录表';



INSERT INTO role (
  name
) VALUES ("admin"),( "teacher"),("student");

-- 正确写法1：显式指定列（推荐，安全）
INSERT INTO user (role_id, code, email, phone, password) 
VALUES 
  (1, 'admin', 'admin@school.com', '2739606014', '$2a$10$2bmxpPfOFIWp8eLPhlpSTOiV83XcaDXCRZ62hcnUwG43Ocm57sMXK'),
  (2, 'teacher01', 'teacher@school.com', '13800138001', '$2a$10$2bmxpPfOFIWp8eLPhlpSTOiV83XcaDXCRZ62hcnUwG43Ocm57sMXK'),
  (3, 'student01', 'student@school.com', '13900139001', '$2a$10$2bmxpPfOFIWp8eLPhlpSTOiV83XcaDXCRZ62hcnUwG43Ocm57sMXK');

INSERT INTO term (name, start_date, end_date) VALUES
('2023-2024 学年第一学期', '2023-09-01', '2024-01-31'),
('2023-2024 学年第二学期', '2024-03-01', '2024-07-31'),
('2024-2025 学年第一学期', '2024-09-01', '2025-01-31'),
('2024-2025 学年第二学期', '2025-03-01', '2025-07-31'),
('2025-2026 学年第一学期', '2025-09-01', '2026-01-31'),
('2025-2026 学年第二学期', '2026-03-01', '2026-07-31');

