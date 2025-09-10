require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        //check user exist
        const existingUser = await User.findOne({
            email: email
        });
        if (existingUser) {
            return {
                EC: 1,
                EM: "Email đã tồn tại",
                DT: null
            };
        }

        //hash user password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //save user to database
        const createdUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: "User"
        });

        return {
            EC: 0,
            EM: "Tạo tài khoản thành công",
            DT: {
                id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                role: createdUser.role
            }
        };
    } catch (error) {
        console.log(error);
        return {
            EC: -1,
            EM: "Đã xảy ra lỗi phía server",
            DT: null
        };
    }
}

const loginService = async (email, password) => {
    try {
        //fetch user by email
        const user = await User.findOne({
            email: email
        });
        if (user) {
            //compare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (isMatchPassword) {
                return {
                    EC: 2,
                    EM: "Email/Password không hợp lệ"
                }
            } else {
                //create an access token
                const payload = {
                    email: user.email,
                    name: user.name
                };

                const accessToken = jwt.sign(
                    payload,
                    process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                );

                return {
                    EC: 0,
                    accessToken,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        let result = await User.find({}).select("-password");
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService,
    loginService,
    getUserService
}