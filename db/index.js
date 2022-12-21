const inquirer = require("inquirer");
const connection = require("./connection");

const viewAllDepartments = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM departments", function (err, results) {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.table(results);
      resolve();
    });
  });
};

const viewAllRoles = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT r.title, r.role_id, d.department, r.salary  FROM roles r LEFT JOIN departments d ON r.department_id = d.department_id",
      function (err, results) {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.table(results);
        resolve();
      }
    );
  });
};

const viewAllEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT e.employee_id, e.first_name, e.last_name, r.title, d.department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager 
      FROM employees e 
      LEFT JOIN roles r ON e.role_id = r.role_id 
      LEFT JOIN departments d ON r.department_id = d.department_id
      LEFT JOIN employees m ON m.employee_id = e.manager_id`,
      function (err, results) {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.table(results);
        resolve();
      }
    );
  });
};

const addDepartment = async () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter a department",
          name: "department",
        },
      ])
      .then((data) => {
        connection.query(
          `INSERT INTO departments (department)
          VALUES (?)`,
          data.department,
          function (err, res) {
            if (err) {
              console.error(err);
              reject(err);
            }
            console.log("added succesfully");
            resolve();
          }
        );
      });
  });
};

const getDepartments = async () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT departments.department FROM departments",
      function (err, results) {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.table(results);
        const departments = results;
        console.log("dept", departments);
        resolve(results);
      }
    );
  });
};

const addRole = async () => {
  const data = await getDepartments();
  const choices = data.map(({ department, department_id }) => ({
    name: department,
    value: department_id,
  }));
  const responses = await inquirer.prompt([
    {
      type: "input",
      message: "Enter a title for new role",
      name: "title",
    },
    {
      type: "input",
      message: "Enter a salary",
      name: "salary",
    },
    {
      type: "list",
      message: "Pick a department",
      name: "department",
      choices: choices,
    },
  ]);
  console.log(results);
};

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
};
