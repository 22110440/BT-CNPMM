const mongoose = require('mongoose');
const Product = require('./models/Product'); // Model bạn đã tạo

const MONGODB_URL = 'mongodb://127.0.0.1:27017/CNPMM';

mongoose.connect(MONGODB_URL)
  .then(async () => {
    console.log('✅ Đã kết nối MongoDB, bắt đầu thêm dữ liệu...');

    // Xóa toàn bộ sản phẩm cũ (nếu muốn clean DB)
    await Product.deleteMany({});

    // Tạo mảng 1000 sản phẩm
    const products = [];
    for (let i = 1; i <= 1000; i++) {
      products.push({
        name: `Sản phẩm ${i}`,
        description: `Mô tả sản phẩm số ${i}`,
        price: Math.floor(Math.random() * 100000) + 1000, // giá random từ 1000 - 100000
        image: `https://picsum.photos/200?random=${i}` // ảnh random
      });
    }

    // Lưu vào DB
    await Product.insertMany(products);
    console.log('🎉 Đã thêm 1000 sản phẩm vào DB thành công!');
    process.exit();
  })
  .catch(err => console.error(err));
