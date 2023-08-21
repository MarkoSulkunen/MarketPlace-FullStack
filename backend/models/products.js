const pool = require("../db/pool");

// products object containing methods to handle database operations on products table
const products = {
/*********************************************************************
  M E T H O D    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: findAll
 DESCRIPTION: method to find all products
*********************************************************************/
  findAll: () =>
    new Promise((resolve, reject) => {
      // Get connection from connection pool
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        // Query to select all products from products table
        connection.query("SELECT * FROM products", (err, result) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }),

/*********************************************************************
  M E T H O D    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: findProductById
 DESCRIPTION: Method to find product by id
*********************************************************************/
  findProductById: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        // Query to select a product by id from products table
        connection.query(
          "SELECT * FROM products WHERE id=?;",
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

/*********************************************************************
  M E T H O D    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: create
 DESCRIPTION: Method to create a product
*********************************************************************/
  create: (product) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        // Query to insert a product into products table
        const query = connection.query(
          "INSERT INTO products SET ?;",
          product,
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }),

/*********************************************************************
  M E T H O D    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: deleteById
 DESCRIPTION: Method to delete a product by id
*********************************************************************/
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      const deleteQuery = "DELETE FROM products WHERE id=?;";
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        // Query to delete a product by id from the products table
        connection.query(deleteQuery, id, (err, result) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }),

/*********************************************************************
  M E T H O D    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: updateById
 DESCRIPTION: Method to update a product by id
*********************************************************************/
  updateById: (id, product) =>
    new Promise((resolve, reject) => {
      console.log(
        "updateById function called with id:",
        id,
        "and data:",
        product
      );
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        // Query to update a product by id in products table
        const updateQuery =
          "UPDATE products SET name=?, price=?, info=?, image=? WHERE id=?;";
        const values = [
          product.name,
          product.price,
          product.info,
          product.image,
          id,
        ];
        connection.query(updateQuery, values, (err, result) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }),
};

module.exports = products;
