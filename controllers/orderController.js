// controllers/orderController.js
const Order = require('../models/Order');

// Place a new order
 async function placeOrder(req, res) {
  const { products, totalPrice } = req.body;
  const user = req.user._id;

  try {
    const order = new Order({
      user,
      products,
      totalPrice,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders for the logged-in user
 async function getOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
    placeOrder,
    getOrders,
  };