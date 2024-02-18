const sequelize = require("../server");
const { DataTypes } = require("sequelize");
const Order = require("./orderModel");
const Book = require("./bookModel");

const BookOrder = sequelize.define("BookOrder", {
  BookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Book",
      key: "id",
    },
  },
  OrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Order",
      key: "id",
    },
  },
});

module.exports = BookOrder;

