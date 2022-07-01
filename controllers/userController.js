const md5 = require('md5');
const sequelize = require('sequelize');
const UserModel = require('../models/User');
const { registerValidator , loginValidator } = require('../validators/userValidator');

exports.register = async (req,res) => {
    try {
        let {username,email,password} = req.body;
        let validator = await registerValidator.validateSync({username,email,password});   
        let user = await UserModel.findOne({where:{[sequelize.Op.or]:[{username},{email}]}});
        if (!user) {
            user = await UserModel.create({username,email,password:md5(password)});
            req.session.user = {username:user.username,email:user.email,group:user.group,token:user.token};
            res.status(200).json({state:true,messages:["The account was created successfully"]});
        } else {
            res.status(400).json({state:false,messages:["An account with this information has already been created"]});
        }
    } catch (error) {
        res.status(400).json({state:false,messages:error.errors});
    }
}

exports.login = async (req,res) => {
    try {
        let {username,password} = req.body;
        let validator = await loginValidator.validateSync({username,password});   
        let user = await UserModel.findOne({attributes:["username","email","group","token"],where:{username,password:md5(password)}});
        if (user) {
            req.session.user = {username:user.username,email:user.email,group:user.group,token:user.token};
            res.status(200).json({state:true,messages:["You have successfully logged in"]});
        } else {
            res.status(400).json({state:false,messages:["The username or password entered is not correct"]});
        }
    } catch (error) {
        res.status(400).json({state:false,messages:error.errors});
    }
}