const router = require("express").Router();
const { Warehouse } = require("../../models");

router.post("/", async (req, res) => {
  await Warehouse.create(req.body);
  res.send("success");
});

module.exports = router;
