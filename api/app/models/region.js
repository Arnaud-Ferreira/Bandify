const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class Region extends Model {};

Region.init({
  region_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  },
  code: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
          isInt: true,
      }
  },
  }, 
  {
  sequelize: database,
  tableName: "region"
});

module.exports = Region;