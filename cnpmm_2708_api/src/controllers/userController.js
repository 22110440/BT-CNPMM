const {
    createUserService,
    loginService,
    getUserService
} = require('../services/userService');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            EC: 2,
            EM: "Thiếu name/email/password",
            DT: null
        });
    }

    const result = await createUserService(name, email, password);

    if (result?.EC === 0) {
        return res.status(201).json(result);
    }

    if (result?.EC === 1) {
        return res.status(409).json(result);
    }

    return res.status(500).json(result || { EC: -1, EM: "Đã xảy ra lỗi phía server", DT: null });
}

const handleLogin = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data);
}

const getUser = async (req, res) => {
    const data = await getUserService();
    return res.status(200).json(data);
}

const getAccount = async (req, res) => {
    return res.status(200).json(req.user);
}

module.exports = {
    createUser,
    handleLogin,
    getUser,
    getAccount
}