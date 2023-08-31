const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SEC, { expiresIn: '1d' })
}


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Please provide all details");
    }

    if (password.length < 6) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Password must be up to 6 characters");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Email has already registered");
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        /*sameSite: "none",
        secure: true*/
    })

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(StatusCodes.CREATED).json({
            _id, name, email, photo, phone, bio, token
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST);
    }

};

module.exports = {
    registerUser,
};