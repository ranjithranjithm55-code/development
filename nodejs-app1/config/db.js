const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "customerdetails"
});

db.connect((err) => {
    if (err) {
        console.log("DB Error:", err); 
        return;
    }
    console.log("MySQL Connected");
});

module.exports = db;