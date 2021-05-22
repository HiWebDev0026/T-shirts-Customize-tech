const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("review", {
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    scoreReview: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });
};
