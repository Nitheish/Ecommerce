// controllers/productController.js
const Product = require('../models/Product');

// Get all products
 async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a new product
 async function addProduct(req, res) {
  const { name, description, image, originalPrice, discountPrice, sellingPrice, quantity, uom, hsnCode } = req.body;
  try {
    const product = new Product({
      name, description, image, originalPrice, discountPrice, sellingPrice, quantity, uom, hsnCode,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    getProducts,
    addProduct,
  };
