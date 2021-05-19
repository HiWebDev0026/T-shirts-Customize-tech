const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
}