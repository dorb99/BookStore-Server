const Address = require("../models/addressModel");
const Book = require("../models/bookModel");
const BookOrder = require("../models/bookOrderModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  const { name, age, password, address } = req.body;
  try {
    const newUser = await User.create({ name, age, password });
    const newAddress = await Address.create({
      city: address.city,
      street: address.street,
    });
    await newAddress.update({ userAddress: newUser.id });
    await newUser.update({ userAddress: newAddress.id });
    res.status(200).json({ status: "success", data: newUser });
  } catch (err) {
    res.status(400).json({ status: "failed", data: err });
  }
};

exports.getUserOrders = async (req, res) => {
  const userPk = req.params.pk;
  const allUserOrders = await Order.findAll({ where: { userOrders: userPk } });

  if (!allUserOrders || allUserOrders.length === 0)
    return res
      .status(404)
      .json({ status: "failed", message: "No orders found" });
  const allOrdersData = [];
  for (let index = 0; index < allUserOrders.length; index++) {
    const currentOrder = allUserOrders[index].dataValues;
    const orderBookInfo = await BookOrder.findAll({
      where: { OrderId: currentOrder.id },
    });
    if (orderBookInfo.length > 0) {
      const orderBook = await Book.findByPk(orderBookInfo[0].BookId);
      allOrdersData[index] = {
        "order: ": index + 1,
        "amount: ": currentOrder.amount,
        "book: ": orderBook.title,
      };
    }
  }

  res.status(200).json({ status: "success", data: allOrdersData });
};
