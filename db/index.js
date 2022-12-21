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
    connection.query("SELECT * FROM departments", function (err, results) {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(results);
    });
  });
};

const insertRole = (responses) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
      [responses.title, responses.salary, responses.department],
      function (err, results) {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("successfully inserted: ", responses);
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
  await insertRole(responses);
};

const getRoles = async () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT roles.role_id, roles.title FROM roles",
      function (err, results) {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("get roles success")
        resolve(results);
      }
    );
  });
};

const getManagers = async () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT DISTINCT employees.employee_id, CONCAT(employees.first_name, " ", employees.last_name) AS manager FROM employees
    WHERE employees.role_id = 1`,
      function (err, results) {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("get managers success", results)
        resolve(results);
      }
    );
  });
};

const insertEmployee = async (responses) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
      [responses.first_name, responses.last_name, responses.role_id, responses.manager_id,],
      function (err, results) {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("successfully inserted: ", responses);
        resolve(results);
      }
    );
  });
}

const addEmployee = async () => {
  const rolesList = await getRoles();
  const rolesMapped = rolesList.map(({ title, role_id }) => ({
    name: title,
    value: role_id,
  }));
  console.log("roles", rolesMapped);
  const managersList = await getManagers();
  console.log(managersList)
  const managersMapped = managersList.map(({ employee_id, manager }) => ({
    name: manager,
    value: employee_id,
  }));
  console.log("managers", managersMapped);
  const responses = await inquirer.prompt([
    {
      type: "input",
      message: "Enter a first name",
      name: "first_name",
    },
    {
      type: "input",
      message: "Enter a last name",
      name: "last_name",
    },
    {
      type: "list",
      message: "Pick a role",
      name: "role",
      choices: rolesMapped,
    },
    {
      type: "list",
      message: "Pick a manager",
      name: "manager",
      choices: managersMapped,
    },
  ]);
  await insertEmployee(responses);
};

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
};
