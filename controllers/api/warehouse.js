const router = require("express").Router();
const { Warehouse, Product } = require("../../models");

//create a new warehouse
router.post("/", async (req, res) => {
  await Warehouse.create(req.body);
  res.send("success");
});

//get all warehouses and associated products
router.get("/", async (req, res) => {
  const allProd = await Warehouse.findAll({
    include: [
      {
        model: Product,
      },
    ],
  });
  res.json(allProd);
});

module.exports = router;
