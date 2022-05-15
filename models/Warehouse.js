const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Warehouse extends Model {}

Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "warehouse",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Warehouse;
