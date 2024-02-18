const sequelize = require("../server");
const { DataTypes } = require("sequelize");
const Address = require("./addressModel");

const Order = sequelize.define(`Order`, {
  amount: { type: DataTypes.NUMBER, allowNull: false },
});


module.exports = Order;