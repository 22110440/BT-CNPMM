const mongoose = require('mongoose');

// Định nghĩa schema cho Product
const ProductSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  image:       { type: String }
});

// Tạo Model từ schema và export
module.exports = mongoose.model('Product', ProductSchema);
