const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    group: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;