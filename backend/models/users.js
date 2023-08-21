const pool = require("../db/pool");

// users object containing methods to handle database operations on users table
const users = {
/*********************************************************************
  M E T H O D    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: create
 DESCRIPTION: Method to create a user
*********************************************************************/
  create: (user) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        // Query to insert a user into users table
        connection.query("INSERT INTO users SET ?;", user, (err, result) => {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }),

/*********************************************************************
  M E T H O D    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: findByEmail
 DESCRIPTION: Method to find user by email
*********************************************************************/
  findByEmail: (email) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        // Query to select user by email from users table
        connection.query(
          "SELECT * FROM users WHERE email LIKE ?;",
          email,
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),

/*********************************************************************
  M E T H O D    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: findUserById
 DESCRIPTION: Method to find user by id
*********************************************************************/
  findUserById: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        // Query to select user by id from users table
        connection.query(
          "SELECT * FROM users WHERE id=?;",
          id,
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),
};

module.exports = users;
