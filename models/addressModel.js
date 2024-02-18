const sequelize = require("../server");
const { DataTypes } = require("sequelize");

const Address = sequelize.define(`Address`, {
  city: { type: DataTypes.STRING, allowNull: false },
  street: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Address;

