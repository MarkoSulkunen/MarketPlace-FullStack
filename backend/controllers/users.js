const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const users = require("../models/users");

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: signUpUser
 DESCRIPTION: 
     Handles the sign up process for a new user.
     This function hashesh the users password using bcrypt,
     checks if user exists in the database, creates a new user
     and returns a JWT token upon successful registration.

 Input: req, res
 Output: JSON object containing created users id, email and JWT token
*********************************************************************/
const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send("Could not create user, try again please");
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password: hashedPassword,
  };

  try {
    const exist = await users.findByEmail(newUser.email);
    if (exist.length > 0) {
      return res.status(422).send("Could create user, user exists");
    }

    const result = await users.create(newUser);
    if (!result) {
      return res.status(500).send("Could not create user, try again please");
    }

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      id: newUser.id,
      email: newUser.email,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Could not create user, try again please");
  }
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: loginUser
 DESCRIPTION: 
     Handles the login process for an existing user.
     Function checks if the user exists in the database,
     verifies password using bcrypt and returns a JWT token upon
     successful authentication.

 Input: req, res
 Output: JSON object containing user id, email and JWT token
*********************************************************************/
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res.status(401).send("No user found - Check your credentials");
    }
    identifiedUser = result[0];
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    if (!isValidPassword) {
      return res.status(401).send("No user found - Check your credentials");
    }
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }

  try {
    const token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      id: identifiedUser.id,
      email: identifiedUser.email,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: getUserById
 DESCRIPTION: Retrieves user from the database by id

 Input: req, res
 Output: JSON object containing users id, name and email
*********************************************************************/
const getUserById = async (req, res) => {
  try {
    const response = await users.findUserById(req.params.id);
    if (response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

// Export functions
module.exports = {
  loginUser,
  signUpUser,
  getUserById,
};
