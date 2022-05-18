const router = require("express").Router();
const { Product, Warehouse } = require("../../models");

router.post("/", async (req, res) => {
  await Product.create(req.body);
  res.send("success");
});

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

router.get("/:id", async (req,res)=>{
  const findProd = await Product.findByPk({req.params.id})
  res.json(findProd)
})
module.exports = router;
