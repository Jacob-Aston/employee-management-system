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
  connection.query("SELECT * FROM roles JOIN departments ON roles.department_id = departments.id", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    return;
  });
};

module.exports = { viewAllDepartments, viewAllRoles };
