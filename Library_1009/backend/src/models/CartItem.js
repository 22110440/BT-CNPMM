const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("CartItem", cartItemSchema);
