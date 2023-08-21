const express = require("express");
const cors = require("cors");
const products = require("./routes/products");
const users = require("./routes/users");

const app = express(); // Creating an instance of the Express application

app.use(cors()); // Enabling Cross-Origin Resource Sharing

app.use(express.json()); // Parsing incoming requests with JSON payloads

app.use("/api/products", products); // Mounting the products router module on the "/api/products" route
app.use("/api/users", users); // Mounting the users router module on the "/api/users" route

// Responds with "OK" to GET requests on the "/health" route
app.get("/health", (req, res) => {
  res.send("OK");
});

module.exports = app;
