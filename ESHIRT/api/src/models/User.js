const DataTypes = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    lastname:{
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
  });
};
