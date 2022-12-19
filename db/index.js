const connection = require("./connection");

const viewAllDepartments = () => {
  connection.query("SELECT * FROM departments", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    return;
  });
};

const viewAllRoles = () => {
  connection.query("SELECT r.title, r.role_id, d.department, r.salary  FROM roles r LEFT JOIN departments d ON r.department_id = d.department_id", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    return;
  });
};

const viewAllEmployees = () => {
  connection.query(
    `SELECT e.employee_id, e.first_name, e.last_name, r.title, d.department, r.salary, e.manager_id 
    FROM employees e LEFT JOIN roles r ON e.role_id = r.role_id 
    LEFT JOIN departments d ON r.department_id = d.department_id`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    return;
  });
};


module.exports = { viewAllDepartments, viewAllRoles ,viewAllEmployees };
