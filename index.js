// Import and require mysql2
const inquirer = require("inquirer");
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
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
      if (data.function == "Add a department") {
        inquirer
          .prompt([
            {
              type: "input",
              massage: "What department will you add?",
              name: "newDepartment",
            },
          ])
          .then(({ newDepartment }) => {
            addDepartment(newDepartment);
          });
      }
      if (data.function == "Add a role") {
        viewAllDepartments();
        console.log(departments);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

inquirerPrompt();
