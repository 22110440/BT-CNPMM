// src/seed.js

import 'dotenv/config';
import mongoose from 'mongoose';
import { productFuzySearch } from './models/ProductFuzySearch.js';

(async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      throw new Error('Missing MONGODB_URI in environment');
    }

    await mongoose.connect(uri, { autoIndex: true });
    console.log('✅ Connected to MongoDB');

    // Xóa dữ liệu cũ
    await productFuzySearch.deleteMany({});
    console.log('🗑️ Old data cleared');

    // Danh sách hãng và mẫu điện thoại
    const brands = {
      Apple: ['iPhone 13', 'iPhone 14', 'iPhone 15', 'iPhone 15 Pro Max'],
      Samsung: ['Galaxy S23', 'Galaxy S24', 'Galaxy Z Fold 5', 'Galaxy A54'],
      Oppo: ['Find X6', 'Reno 10 Pro', 'A98', 'F23'],
      Realme: ['Realme 11 Pro', 'Realme GT Neo 5', 'Realme C55', 'Realme Narzo 60x']
    };

    // Thông số mô tả mẫu
    const displays = ['6.1-inch OLED', '6.7-inch AMOLED', '6.5-inch LCD', '6.8-inch Dynamic AMOLED'];
    const processors = ['Snapdragon 8 Gen 2', 'Apple A16 Bionic', 'Dimensity 9200', 'Exynos 2200'];
    const rams = ['6GB', '8GB', '12GB', '16GB'];
    const storages = ['128GB', '256GB', '512GB', '1TB'];
    const batteries = ['4000mAh', '4500mAh', '5000mAh', '5500mAh'];

    const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const products = [];

    // Thêm sản phẩm thật
    Object.entries(brands).forEach(([brand, models]) => {
      models.forEach(model => {
        products.push({
          name: `${brand} ${model}`,
          description: `${brand} ${model} with ${randomPick(displays)}, powered by ${randomPick(processors)}, ${randomPick(rams)} RAM, ${randomPick(storages)} storage, and ${randomPick(batteries)} battery.`
        });
      });
    });

    // Sinh thêm sản phẩm giả để đủ ~1000
    let count = products.length;
    const brandKeys = Object.keys(brands);
    while (count < 1000) {
      const brand = brandKeys[Math.floor(Math.random() * brandKeys.length)];
      const model = `Model ${count}`;
      products.push({
        name: `${brand} ${model}`,
        description: `${brand} ${model} with ${randomPick(displays)}, powered by ${randomPick(processors)}, ${randomPick(rams)} RAM, ${randomPick(storages)} storage, and ${randomPick(batteries)} battery.`
      });
      count++;
    }

    await productFuzySearch.insertMany(products);

    console.log(`✅ Seed data inserted: ${products.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding:', err);
    process.exit(1);
  }
})();
