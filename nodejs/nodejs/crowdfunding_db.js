const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: 'your_password', // your MySQL password
    database: 'crowdfunding_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
