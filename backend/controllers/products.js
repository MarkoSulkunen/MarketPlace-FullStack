const Joi = require("joi");
const products = require("../models/products");

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: getProducts
 DESCRIPTION: Retrieves all products from the database

 Input: req, res
 Output: All products from the database
*********************************************************************/
const getProducts = async (req, res) => {
  try {
    const response = await products.findAll();
    if (response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: getProductById
 DESCRIPTION: Retrieves product by id from the database

 Input: req, res 
 Output: Product by id
*********************************************************************/
const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await products.findProductById(id);
    if (response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: createProduct
 DESCRIPTION: Creates new product in the database

 Input: req, res
 Output: Created product object
*********************************************************************/
const createProduct = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    info: Joi.string().required(),
    owner: Joi.string(),
    contact: Joi.string(),
    location: Joi.string(),
    image: Joi.string(),
    userId: Joi.string().required(),
  });

  // Validating product data agaist Joi schema
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // New product object from request body
  const product = {
    name: req.body.name,
    price: req.body.price,
    info: req.body.info,
    owner: req.body.owner,
    contact: req.body.contact,
    location: req.body.location,
    image: req.body.image,
    userId: req.body.userId,
  };

  try {
    // Check if the product is already in the database
    const result = await products.findByProduct(product);
    // If the product is in the database, send error.
    if (result.length > 0) {
      res.status(400).send("Product is in the database already");
      return;
    }
    // Creates new product in the database
    const response = await products.create(product);
    // If created successfully, send product object
    if (response) {
      product.id = response.insertId;
      res.status(201).send(product);
    }
    // Log errors
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: deleteProduct
 DESCRIPTION: Deletes a product by id from the database

 Input: req, res 
 Output: Success message
*********************************************************************/
const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await products.deleteById(id);
    if (response) {
      res.status(200).send("Product deleted");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: editProduct
 DESCRIPTION: Updates a product in the database by id

 Input: req, res
 Output: Message indicating success or failure
*********************************************************************/
const editProduct = async (req, res) => {
  console.log("editProduct function called");
  console.log(
    "Request received at editProduct endpoint with params:",
    req.params
  );
  console.log("Request body:", req.body);

  // Joi validation schema for the request body
  const schema = Joi.object({
    name: Joi.string(),
    price: Joi.string(),
    info: Joi.string(),
    owner: Joi.string(),
    contact: Joi.string(),
    location: Joi.string(),
    image: Joi.string(),
    userId: Joi.string(),
  });

  // Validating request body against the Joi schema
  const { error } = schema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    res.status(400).send(error.details[0].message);
    return;
  }

  const id = parseInt(req.params.id);
  const productData = {
    name: req.body.name,
    price: String(req.body.price),
    info: req.body.info,
    owner: req.body.owner,
    contact: req.body.contact,
    location: req.body.contact,
    image: req.body.image,
    userId: req.body.userId,
  };

  try {
    // Updates the product in the database
    const result = await products.updateById(id, productData);
    if (result.affectedRows === 0) {
      console.log("Product not found");
      // 404 response if the product is not found
      res.status(404).send("Product not found");
      return;
    }
    console.log("Product updated");
    // 200 response indicating success
    res.status(200).send("Product updated");
  } catch (err) {
    // Log errors
    console.log("Error:", err);
    res.status(500).send("Something went wrong");
  }
};

// Export functions
module.exports = {
  createProduct,
  getProductById,
  deleteProduct,
  getProducts,
  editProduct,
};
