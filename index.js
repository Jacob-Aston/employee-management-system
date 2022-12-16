// Import and require mysql2
const inquirer = require("inquirer");

// const PORT = process.env.PORT || 3001;

// // Express middleware

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
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Change an employee role"],
    }
  ])
  .then((data) => {

  })

// Hardcoded query: DELETE FROM course_names WHERE id = 3;

// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// // Query database
// db.query('SELECT * FROM course_names', function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

