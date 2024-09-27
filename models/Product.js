// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number },
  sellingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  uom: { type: String, required: true },
  hsnCode: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
