const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const orderController = require("../controllers/orderController");

router.route("/").post(orderController.createOrder);

module.exports = router;
