const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const UserModel = require('./User');
const PostModel = require('./Post');

const PostComment = sequelize.define("PostComment",{
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

UserModel.hasOne(PostComment,{foreignKey:'owner'});
PostComment.belongsTo(UserModel,{foreignKey:'owner'});

PostModel.hasOne(PostComment,{foreignKey:'postid'});
PostComment.belongsTo(PostModel,{foreignKey:'postid'});

module.exports = PostComment;