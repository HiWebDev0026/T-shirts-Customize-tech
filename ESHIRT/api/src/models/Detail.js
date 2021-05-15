const  DataTypes = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('detail', {
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    }     
  });
};