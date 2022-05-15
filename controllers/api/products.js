const router = require("express").Router();
const { Product } = require("../../models");

router.post("/", async (req, res) => {
  await Product.create(req.body);
  res.send("success");
});

module.exports = router;
