const  DataTypes = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('detail', {
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    }     
  });
};