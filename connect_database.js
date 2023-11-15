const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("store", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
