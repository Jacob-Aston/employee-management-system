INSERT INTO departments (department)
VALUES ("department 1"),
       ("department 2"),
       ("department 3");

INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 10, 1),
       ("dish_pit", 1000, 1),
       ("dave", 99, 2);

SET foreign_key_checks = 0;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("jacob", "aston", 2, 2),
       ("joe", "mama", 1, 2),
       ("dave", "", 3, 2);

SET foreign_key_checks = 1;