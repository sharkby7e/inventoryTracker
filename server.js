const express = require("express");
const connection = require("./config/connection");
const { Product, Warehouse } = require("./models");

connection.sync({ force: false }).then(() => console.log("database ready"));

const app = express();
const port = 3000;

app.use(express.json());

app.post("/warehouses", async (req, res) => {
  await Warehouse.create(req.body);
  res.send("success");
});

app.post("/products", async (req, res) => {
  await Product.create(req.body);
  res.send("success");
});

app.listen(port, () => console.log("Running server on port " + port));
