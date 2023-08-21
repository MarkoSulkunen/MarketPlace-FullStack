const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  editProduct,
} = require("../controllers/products");

// Routes and their corresponding controller methods
router.get("/", (req, res) => {
  getProducts(req, res);
});

router.get("/:id", getProductById);

router.use(verifyToken);

router.post("/", createProduct);
router.delete("/:id", deleteProduct);

router.patch("/:id", editProduct);

module.exports = router;
