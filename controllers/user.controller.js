const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { registerValidator, loginValidator } = require('../validators/userValidator');

const UserModel = require('../models/user.model');

exports.register = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        //* Validate
        let validator = await registerValidator.validateSync({ username, email, password });
        //* Check User Exists for Create New User
        let user = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            user = await UserModel.create({ username, email, password: md5(password) });
            //* Sign New Authorization Token For User
            let authorization = jwt.sign({ userid: user._id }, process.env.JWT_SECRET);
            res.status(201).json({ state: true, authorization, messages: ["The account was created successfully"] });
        } else {
            res.status(400).json({ state: false, messages: ["An account with this information has already been created"] });
        }
    } catch (error) {
        res.status(400).json({ state: false, messages: error.errors });
    }
}

exports.login = async (req, res) => {
    try {
        let { username, password } = req.body;
        //* Validate
        let validator = await loginValidator.validateSync({ username, password });
        //* Find User With Username , Password
        let user = await UserModel.findOne({ username, password: md5(password) }, { _id: 1 });
        if (user) {
            //* Sign New Authorization Token For User
            let authorization = jwt.sign({ userid: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ state: true, authorization, messages: ["You have successfully logged in"] });
        } else {
            res.status(400).json({ state: false, messages: ["The username or password entered is not correct"] });
        }
    } catch (error) {
        res.status(400).json({ state: false, messages: error.errors });
    }
}