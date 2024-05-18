const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

const db = mysql.createConnection({
  host: "database-dev.cj0o4we0atoz.eu-north-1.rds.amazonaws.com", 
  port:'3306',
  user: "admin", 
  password: "Techrovar.it", 
  database: "dev_database", 
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

module.exports = db;
