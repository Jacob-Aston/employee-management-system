// Import and require mysql2
const inquirer = require("inquirer");
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
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
    .then( async (data) => {
      if (data.function == "View all departments") {
        await viewAllDepartments();
      }
      if (data.function == "View all roles") {
        await viewAllRoles();
      }
      if (data.function == "View all employees") {
        await viewAllEmployees();
      }
      if (data.function == "Add a department") {
        await addDepartment();
      }
      if (data.function == "Add a role") {
        await addRole()
      }
      inquirerPrompt()
    })
    .catch((err) => {
      console.error(err);
    });
};

inquirerPrompt();
