const express = require("express");
const connection = require("./config/connection");
// const { Product, Warehouse } = require("./models");
const routes = require("./controllers");
const path = require("path");

connection.sync({ force: false }).then(() => console.log("database ready"));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(routes);

app.listen(PORT, () => console.log("Running server on port " + PORT));
