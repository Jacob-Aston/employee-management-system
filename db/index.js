const connection = require('./connection');

const viewAllDepartments = () => {
    connection.query('SELECT * FROM departments', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
    })
}

module.exports = { viewAllDepartments };