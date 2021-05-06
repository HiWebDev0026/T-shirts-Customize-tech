const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('shirt', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM('S', 'M', 'L', 'XL', 'XXL'),
      allowNull: false,
    },
    print: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
};


/* testeando GIT PUSH  */