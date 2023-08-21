const express = require("express");
const router = express.Router();

const { loginUser, signUpUser, getUserById } = require("../controllers/users");

// Routes and their corresponding controller methods
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);

module.exports = router;
