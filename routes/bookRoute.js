const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");
const bookController = require("../controllers/bookController")

router.route("/").post(bookController.createBook);
module.exports = router;
