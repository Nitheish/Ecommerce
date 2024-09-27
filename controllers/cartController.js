// controllers/cartController.js
import { v4 as uuidv4 } from 'uuid';

 async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  const cartId = uuidv4();  // Generate a unique ID for the cart item
  const userId = req.user._id;

  try {
    // Assuming you have a Cart model or similar functionality to add items
    const cartItem = {
      id: cartId,
      productId,
      quantity,
      user: userId,
    };

    // Persist the cart item logic
    // e.g., await Cart.save(cartItem);

    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    addToCart,
  };