const Order = require('../models/Order');

// Place a new order
async function placeOrder(req, res) {
  const { products, totalPrice, paymentMethod = 'Cash' } = req.body; // Optional payment method
  const user = req.user._id;

  try {
    const formattedProducts = products.map((product) => {
      // Directly use the provided product details from the request
      return {
        product: product.productId, // Assuming product.productId is the ID of the existing product
        quantity: product.quantity, // Quantity from the request
      };
    });

    // Create a new order with user, formatted products, and total price
    const order = new Order({
      user,
      products: formattedProducts, // Use the formatted products
      totalPrice,
      paymentMethod
    });

    // Save the order to the database
    await order.save();

    // Respond with the created order and status code 201 (created)
    res.status(201).json(order);
  } catch (error) {
    // Respond with error message and status code 400 (bad request) if there is an error
    res.status(400).json({ error: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: 'products.product', // Field to populate
        select: 'name description originalPrice sellingPrice image' // Fields to return
      });

    // Respond with the list of orders including product details and quantity
    console.log(JSON.stringify(orders, null, 2));
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get a specific order by its ID for the logged-in user
async function getOrderById(req, res) {
  const { orderId } = req.params;

  try {
    // Find the specific order by ID and user, and populate product details
    const order = await Order.findOne({ _id: orderId, user: req.user._id })
    .populate({
      path: 'product', // Field to populate
      select: 'name description originalPrice sellingPrice image', // Fields to return
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Respond with the order details including product info and quantity
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
};
