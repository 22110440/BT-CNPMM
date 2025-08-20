// Cách 1: ES6 import (nếu dùng "type": "module" trong package.json)
import { Sequelize } from 'sequelize';

// Cách 2: CommonJS (nếu không dùng ES6 module)
// const { Sequelize } = require('sequelize');

// Option 3: Truyền tham số trực tiếp
const sequelize = new Sequelize('node_fulltask', 'root', '1234567@a$', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
