const CartItem = require("../models/CartItem");

// Lấy tất cả sản phẩm trong giỏ
exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm sản phẩm
exports.addItem = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const newItem = new CartItem({ name, quantity, price });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật sản phẩm
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    const updatedItem = await CartItem.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa sản phẩm
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
