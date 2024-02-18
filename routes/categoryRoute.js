const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.route("/:category").get(categoryController.getAllBooks);

module.exports = router;
