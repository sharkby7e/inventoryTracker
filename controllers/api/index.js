const router = require("express").Router();
const productRoutes = require("./products");
const warehouseRoutes = require("./warehouse");

router.use("/products", productRoutes);
router.use("/warehouses", warehouseRoutes);

module.exports = router;
