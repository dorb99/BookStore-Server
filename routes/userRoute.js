const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userController = require("../controllers/userController");

router.route("/").post(userController.createUser)
router.route("/:pk").get(userController.getUserOrders)

module.exports = router;
