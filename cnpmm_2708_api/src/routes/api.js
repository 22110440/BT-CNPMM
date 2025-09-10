const express = require('express');
const {
    createUser,
    handleLogin,
    getUser,
    getAccount
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

// Công khai các route không cần auth: /, /register, /login
// Áp dụng auth cho các route còn lại nếu cần (ví dụ: /user, /account)


routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api");
});

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/user", auth, getUser);
routerAPI.get("/account", auth, delay, getAccount);

module.exports = routerAPI; //export default