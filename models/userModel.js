const sequelize = require("../server");
const { DataTypes } = require("sequelize");
const Address = require("./addressModel");
const Order = require("./orderModel");

const User = sequelize.define(`User`, {
  name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.NUMBER },
});

User.belongsTo(Address, { foreignKey: "userAddress", as: "address" });
Address.belongsTo(User, { foreignKey: "userAddress", as: "userId" });
User.hasMany(Order, { foreignKey: "userOrders", as: "userOrders" });
Order.belongsTo(User, { foreignKey: "userOrders", as: "user" });

User.prototype.createUserOrder = async function (orderId) {
  await this.addUserOrder(orderId);
};

module.exports = User;

