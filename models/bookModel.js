const sequelize = require("../server");
const { DataTypes } = require("sequelize");
const Author = require("./authorModel");
const Category = require("./categoryModel");
const Order = require("./orderModel");
const bookOrderModel = require("./bookOrderModel");
const bookCategoryModel = require("./bookCategoryModel");


const Book = sequelize.define(`Book`, {
  title: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.NUMBER },
});

Book.belongsTo(Author, { foreignKey: "authorBooks", as: "author"  });
Author.hasMany(Book, { foreignKey: "authorBooks", as: "books"  });
Book.belongsToMany(Category, { through: bookCategoryModel });
Category.belongsToMany(Book, { through: bookCategoryModel });
Book.belongsToMany(Order, { through: bookOrderModel });
Order.belongsToMany(Book, { through: bookOrderModel });

module.exports = Book;

