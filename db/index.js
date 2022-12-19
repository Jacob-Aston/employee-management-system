const { default: inquirer } = require("inquirer");
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
    `SELECT e.employee_id, e.first_name, e.last_name, r.title, d.department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager 
    FROM employees e 
    LEFT JOIN roles r ON e.role_id = r.role_id 
    LEFT JOIN departments d ON r.department_id = d.department_id
    LEFT JOIN employees m ON m.employee_id = e.manager_id`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    return;
  });
};

const addDepartment = (newDepartment) => {
  connection.query(
    `INSERT INTO departments (department)
    VALUES (?)`, newDepartment, function (err, res) {
      if(err) {
        console.log(err);
      }
      console.log("added succesfully")
      return;
    }
  )
}


module.exports = { viewAllDepartments, viewAllRoles ,viewAllEmployees, addDepartment };
