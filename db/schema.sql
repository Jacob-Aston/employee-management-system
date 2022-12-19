DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;


USE employees_db;


CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30), 
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employees(employee_id)
    ON DELETE SET NULL
);