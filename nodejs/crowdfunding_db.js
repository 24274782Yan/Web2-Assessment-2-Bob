const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: '123456', // your MySQL password
    database: 'crowdfunding_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;
