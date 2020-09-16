// Set up MySQL connection.
const mysql = require("mysql");
const dotenv = require("dotenv");

//set password to mySQL DB
dotenv.config();
const sqlPass = process.env.secret

//Connection information for the sql database
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL)
}else{
    const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 8080
    port: 8080,

    // Your username
    user: "root",

    // Your password
    password: sqlPass,
    database: "burgers_db"
  });
}


// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
