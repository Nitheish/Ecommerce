// models/Order.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash' },
  isPaid: { type: Boolean, default: false },
  orderUUID: { type: String, default: uuidv4 },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
