const md5 = require('md5');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const UserModel = require('../models/User');
const { registerValidator, loginValidator } = require('../validators/userValidator');

exports.register = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let validator = await registerValidator.validateSync({ username, email, password });
        let user = await UserModel.findOne({ where: { [sequelize.Op.or]: [{ username }, { email }] } });
        if (!user) {
            user = await UserModel.create({ username, email, password: md5(password) });
            let authorization = jwt.sign({ userid: user.id }, process.env.JWT_SECRET);
            res.status(200).json({ state: true, authorization, messages: ["The account was created successfully"] });
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
        let validator = await loginValidator.validateSync({ username, password });
        let user = await UserModel.findOne({ attributes: ["id", "username", "email"], where: { username, password: md5(password) } });
        if (user) {
            let authorization = jwt.sign({ userid: user.id }, process.env.JWT_SECRET);
            res.status(200).json({ state: true, authorization, messages: ["You have successfully logged in"] });
        } else {
            res.status(400).json({ state: false, messages: ["The username or password entered is not correct"] });
        }
    } catch (error) {
        res.status(400).json({ state: false, messages: error.errors });
    }
}