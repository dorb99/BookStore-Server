const sequelize = require("../server");
const { DataTypes } = require("sequelize");

const BookCategory = sequelize.define("BookCategory", {
  BookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Book", 
      key: "id",
    },
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Category", 
      key: "id",
    },
  },
});

module.exports = BookCategory;