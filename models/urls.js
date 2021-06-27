'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class URLs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  URLs.init({
    id:{
      primaryKey: true,
      type: DataTypes.BIGINT                   
  },
  code:{
      type: DataTypes.STRING(7),
      unique: true
  },
  link:{
      type: DataTypes.TEXT,
      allowNull: false
  }
  }, {
    sequelize,
    tableName:'urls',
    modelName: 'URLs',
  });
  return URLs;
};