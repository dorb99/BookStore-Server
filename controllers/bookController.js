const Author = require("../models/authorModel");
const BookCategory = require("../models/bookCategoryModel");
const Book = require("../models/bookModel");
const Category = require("../models/categoryModel");

exports.createBook = async (req, res) => {
  const { title, amount, author, categories } = req.body;

  try {
    const isAuthor = await Author.findByPk(author);

    if (!isAuthor) {
      return res.status(404).json({ status: "failed", data: "Author doesn't exist" });
    }

    const newBook = await Book.create({ title, amount, author });

    if (categories && categories.length > 0) {
      const categoryIds = [];

      for (const categoryName of categories) {
        let categoryId;
        const categoryInstance = await Category.findOne({ where: { name: categoryName } });

        if (categoryInstance) {
          categoryId = categoryInstance.id;
        } else {
          const newCategory = await Category.create({ name: categoryName });
          categoryId = newCategory.id;
        }

        categoryIds.push(categoryId);

        // Create BookCategory association
        await BookCategory.create({
          BookId: newBook.id,
          CategoryId: categoryId,
        });
      }

      // Add categories to the book
      await newBook.addCategories(categoryIds);
    }

    // Add book to author's books
    await isAuthor.addBooks(newBook.id);

    res.status(200).json({
      status: "success",
      data: { newBook },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", massage: error.message });
  }
};
