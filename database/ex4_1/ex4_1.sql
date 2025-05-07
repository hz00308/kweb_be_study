CREATE TABLE students (
    `name` VARCHAR(20) NOT NULL,
    `admission_year` YEAR NOT NULL,
    `major_code` VARCHAR(10) NOT NULL,
    `personal_code` VARCHAR(10) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `total_credits` INT DEFAULT 0,
    `gpa` DECIMAL(3,2) DEFAULT 0.0,
    `enrolled` TINYINT(1) DEFAULT TRUE,
    PRIMARY KEY (`admission_year`, `major_code`, `personal_code`)
);