const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const UserModel = require('./User');

const Post = sequelize.define("Post",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.STRING
    }
});

UserModel.hasOne(Post,{foreignKey:'owner'});
Post.belongsTo(UserModel,{foreignKey:'owner'});

module.exports = Post;