const  DataTypes = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('CART', 'PENDING', 'APPROVED', 'DISPATCHED', 'DONE', 'CANCELED')
    }
  });
};