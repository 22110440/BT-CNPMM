// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;  // Cổng server

// Middleware cho phép parse JSON và bật CORS
app.use(express.json());
app.use(cors());

// Chuỗi kết nối MongoDB
const MONGODB_URL = 'mongodb://127.0.0.1:27017/CNPMM';
mongoose.connect(MONGODB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Đã kết nối MongoDB thành công'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));
const productRoutes = require('./routes/product');
app.use('/products', productRoutes);
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}/`);
});