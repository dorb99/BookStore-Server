const Book = require("../models/bookModel");
const Category = require("../models/categoryModel");

exports.getAllBooks = async (req, res) => {
  const categoryName = req.params.category;
  try {
    const category = await Category.findAll({
      where: { name: categoryName },
      include: [Book],
    });
    if (!category) {
      return res
        .status(404)
        .json({ status: "failed", data: "Category not found" });
    }
    const books = category.Books;
    res.status(200).json({ status: "success", data: category });
  } catch (err) {
    res.status(500).json({ status: "failed", data: err });
  }
};

exports.getBooksByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    // Find the category by its ID
    const category = await Category.findByPk(categoryId, {
      include: [Book], // Include the associated Book model
    });

    if (!category) {
      return res
        .status(404)
        .json({ status: "failed", data: "Category not found" });
    }

    // Access associated books using category.Books
    const booksInCategory = category.Books;

    res
      .status(200)
      .json({ status: "success", data: { books: booksInCategory } });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};
