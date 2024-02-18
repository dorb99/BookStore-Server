const express = require("express");
const router = express.Router();
const Author = require("../models/authorModel");
const authorController = require("../controllers/authorController")


router.route("/:pk").get(authorController.getAuthor)

module.exports = router;
