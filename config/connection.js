const Sequelize = require("sequelize");

const connection = new Sequelize("db", "user", "pass", {
  dialect: "sqlite",
  storage: "db.sqlite",
});

module.exports = connection;
