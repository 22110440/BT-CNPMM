import express from "express"; // cú pháp ES6 (tương đương: const express = require('express'))

// javascript theo ES6
const ViewEngine = (app) => {
  app.use(express.static("./src/public")); // Thiết lập thư mục tĩnh chứa images, css, js...
  app.set("view engine", "ejs");           // Thiết lập view engine
  app.set("views", "./src/views");         // Thư mục chứa views
}

export default ViewEngine; // Xuất hàm ra