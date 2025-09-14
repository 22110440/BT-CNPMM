// routes/product.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /products?page=<page>&limit=<limit>
router.get('/', async (req, res) => {
  try {
    // Lấy page và limit từ query, nếu không có thì mặc định page=1, limit=10
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    if (page < 1) page = 1;

    // Tính toán skip (bỏ qua bao nhiêu sản phẩm đầu tiên)
    const skip = (page - 1) * limit;

    // Thực hiện truy vấn MongoDB với phân trang
    const products = await Product.find()        // tìm tất cả sản phẩm
      .skip(skip)                                // bỏ qua (page-1)*limit sản phẩm đầu tiên
      .limit(limit);                             // giới hạn lấy 'limit' sản phẩm

    // Tính tổng số sản phẩm (để trả về cho frontend)
    const total = await Product.countDocuments();

    // Tạo kết quả JSON với dữ liệu và thông tin phân trang
    res.json({
      data: products,
      total: total,
      page: page,
      limit: limit
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
