const Book = require("../models/bookModel");
const BookOrder = require("../models/bookOrderModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

exports.createOrder = async (req, res) => {
  const { bookName, userId, amount } = req.body;

  try {
    if (!userId)
      return res
        .status(404)
        .json({ status: "failed", message: "Didn't receive userId" });

    if (!bookName)
      return res
        .status(404)
        .json({ status: "failed", message: "Didn't receive book name" });

    const book = await Book.findOne({ where: { title: bookName } });
    if (!book)
      return res
        .status(404)
        .json({ status: "failed", message: "Book not found" });

    if (book.amount <= amount)
      return res
        .status(409)
        .json({ status: "failed", message: "Not enough books" });

    const user = await User.findByPk(userId);
    if (user) {
      const newOrder = await Order.create({ amount, userId });
      await user.createUserOrder(newOrder.id);
      await BookOrder.create({ BookId: book.id, OrderId: newOrder.id });
      return res.status(200).json({ status: "success", message: newOrder });
    } else {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

