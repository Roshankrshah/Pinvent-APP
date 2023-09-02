const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

const contactUs = async (req, res) => {
    const { subject, message } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("User not found,please SignUp");
    }

    if (!subject || !message) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Please add subject and message');
    }

    const send_to = process.env.EMAIL;
    const sent_from = process.env.EMAIL;
    const reply_to = user.email;

    sendEmail(subject, message, send_to, sent_from,reply_to)
        .then(() => {
            res.status(StatusCodes.OK).json({ success: true, message: "Email Sent" });
        })
        .catch(err => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Email not sent, please try again" });
        });
};

module.exports = {
    contactUs
};