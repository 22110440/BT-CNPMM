import express from "express"; // nạp express
import bodyParser from "body-parser"; // nạp body-parser lấy tham số từ client /user?id=7
import viewEngine from "./config/viewEngine.js"; // sửa đường dẫn để khớp với tên file
import initWebRoutes from "./route/web.js"; // nạp file web từ Route
import connectDB from "./config/configdb.js"; // nạp cấu hình DB
import cors from 'cors'; // thêm cors
import dotenv from 'dotenv'; // gọi hàm config của dotenv để chạy lệnh process.env.PORT
dotenv.config();

let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true })); // thêm middleware cors

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969; // tạo tham số port lấy từ .env
// nếu PORT === undefined => port = 6969

// chạy server
app.listen(port, () => {
  // callback
  console.log("Backend Nodejs is running on the port : " + port);
});
