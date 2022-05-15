const Product = require("./Product");
const Warehouse = require("./Warehouse");

Warehouse.hasMany(Product, {
  foreignKey: "warehouse_id",
  onDelete: "CASCADE",
});

Product.belongsTo(Warehouse, {
  foreignKey: "warehouse_id",
});

module.exports = { Warehouse, Product };
