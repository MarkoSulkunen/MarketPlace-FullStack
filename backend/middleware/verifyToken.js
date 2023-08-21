const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: verifyToken
 DESCRIPTION:
     Middleware function that verifies the authenticity of a JWT token
     in the request headers authorization field. If token is valid, it
     adds userData property to the request object and passes control
     to the next middleware function.
     
 Input: req, res, next
 Output: None
*********************************************************************/
const verifyToken = (req, res, next) => {
  // If the request is OPTIONS request, pass control to the next middleware 
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // Get token from the authorization headers bearer token
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      throw new Error("Authentication failed");
    }
    // Verify token and decode its payload
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded payload to the userData
    req.userData = { userId: decodedToken.id };
    next();
  } catch (err) {
    // Log errors
    res.status(401).send("Authentication failed");
  }
};

module.exports = verifyToken;
