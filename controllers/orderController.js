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
async function getOrderById(req, res) {
  const { orderId } = req.params; // Extract order ID from request parameters

  try {
    const order = await Order.findOne({ _id: orderId, user: req.user._id }).populate('products.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' }); // Respond with 404 if order not found
    }
    
    res.json(order); // Respond with the found order
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle any errors and respond with a 400 status
  }
}

module.exports = {
    placeOrder,
    getOrders,
    getOrderById,
  };