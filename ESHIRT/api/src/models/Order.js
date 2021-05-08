const  DataTypes = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    delivery_adress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING
    }
  });
};