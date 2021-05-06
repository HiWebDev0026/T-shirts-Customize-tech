const  DataTypes = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
};