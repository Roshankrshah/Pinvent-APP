const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

const protect  = async(req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        res.status(StatusCodes.UNAUTHORIZED)
        throw new Error("Not authorized, please login");
    }

    const verified = jwt.verify(token, process.env.JWT_SEC);
    const user = await User.findById(verified.id).select("-password");

    if(!user){
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("User not found");
    }
    req.user = user;
    next();
};

module.exports = protect;