const router = require("express").Router();
const { Product, Warehouse } = require("../../models");

//create a new product
router.post("/", async (req, res) => {
  await Product.create(req.body);
  res.send("success");
});

//get all products witn associated Warehouse
router.get("/", async (req, res) => {
  const allProd = await Product.findAll({
    include: [
      {
        model: Warehouse,
        attributes: ["location"],
      },
    ],
  });
  res.json(allProd);
});

// get product by id
router.get("/:id", async (req, res) => {
  const findProd = await Product.findByPk(req.params.id);
  res.json(findProd);
});

// update product by id
router.put("/:id", async (req, res) => {
  const upProd = await Product.update(
    {
      ...req.body,
    },
    {
      where: { id: req.params.id },
    }
  );
  res.json(upProd);
});

// delete product by id
router.delete("/:id", async (req, res) => {
  const delProd = await Product.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json("Item successfuly destroyed");
});

module.exports = router;
