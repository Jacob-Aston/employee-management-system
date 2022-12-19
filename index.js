// Import and require mysql2
const inquirer = require("inquirer");
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
} = require("./db/index.js");

const inquirerPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Pick a function",
        name: "function",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Change an employee role",
        ],
      },
    ])
    .then((data) => {
      if (data.function == "View all departments") {
        viewAllDepartments();
      }
      if (data.function == "View all roles") {
        viewAllRoles();
      }
      if (data.function == "View all employees") {
        viewAllEmployees();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

inquirerPrompt();
