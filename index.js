// Import and require mysql2
const inquirer = require("inquirer");
const { viewAllDepartments } = require("./db/index.js");

// // Connect to database
// const db = mysql.createConnection(
  //   {
    //     host: 'localhost',
    //     // MySQL username,
    //     user: 'root',
    //     // MySQL password
    //     password: 'password',
    //     database: 'courses_db'
    //   },
    //   console.log(`Connected to the courses_db database.`)
    // );
    
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
        ]
      },
    ])
    .then((data) => {
      if (data.function == "View all departments") {
        viewAllDepartments()
      }
  })
  .catch((err) => {
    console.error(err);
  });