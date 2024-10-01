const Product = require('../models/Product');

// Get all products
async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

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
}

// Fetch product by ID
async function getProductById(req, res) {
  const productId = req.params.id; // Get the product ID from the request parameters

  try {
    const product = await Product.findById(productId); // Find the product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // Handle case where product is not found
    }
    res.json(product); // Return the product details
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors
  }
}

module.exports = {
  getProducts,
  addProduct,
  getProductById, // Export the new function
};
