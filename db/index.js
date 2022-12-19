const connection = require("./connection");

const viewAllDepartments = () => {
  connection.query("SELECT * FROM departments", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    return;
  });
};

const viewAllRoles = () => {
  connection.query("SELECT r.title, r.role_id, d.department, r.salary  FROM roles r LEFT JOIN departments d ON r.department_id = d.department_id", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    return;
  });
};

module.exports = { viewAllDepartments, viewAllRoles };
