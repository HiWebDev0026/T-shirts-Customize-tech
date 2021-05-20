const DataTypes = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
      allowNull: true
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    
    }
  });
};
