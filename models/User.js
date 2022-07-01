const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const User = sequelize.define("User",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false  
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    group: {
        type: DataTypes.ENUM("user","admin","superadmin"),
        defaultValue: "user"
    },
    token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    }
});

module.exports = User;