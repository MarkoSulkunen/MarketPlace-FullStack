const mysql = require("mysql2");

// Loads environment variables from .env file
require("dotenv").config();

// Creates pool of connections to the MySQL database using the environment variables
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Export the pool
module.exports = pool;
