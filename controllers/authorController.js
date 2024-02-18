const Author = require("../models/authorModel");
const Book = require("../models/bookModel");

exports.getAuthor = async (req, res) => {
  const authorId = req.params.author;
  Book.find({
    include: [authorId],
  })
    .then((author) => {
      if (!author) {
        res.status(404).json({ status: "user Not Found" });
        return;
      }
      res.status(200).json({
        status: "success",
        data: author,
      });
    })
    .catch((error) => {
      res.status(500).json({ status: "failed", data: error });
    });
};
