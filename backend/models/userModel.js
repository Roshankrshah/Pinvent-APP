const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name"]
    },
    email: {
        type: String,
        require: [true, "Please add email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        require: [true, "Please provide password"],
        minLength: [6, "Password must be up to 6 characters"],
        maxLength: [23, "Password must not be more than 23 characters"],
    },
    photo: {
        type: String,
        required: [true, 'Please add photo'],
        default: "../public/images/avatar.png"
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);