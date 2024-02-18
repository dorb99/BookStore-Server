const { Sequelize } = require("sequelize");
const port = 6000;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

module.exports = sequelize;

sequelize.sync()
const app = require("./app");
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
