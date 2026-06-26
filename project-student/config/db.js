const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "student"
});

db.connect((err) => {
    if (err) {
        console.log("DB Error:", err);
        return;
    }
    console.log("mysql connected")
});

module.exports = db;