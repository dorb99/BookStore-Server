const express = require("express");
const app = express();

const crudRoute = require("./routes/crudRoute");
const bookRoute = require("./routes/bookRoute");
const authorRoute = require("./routes/authorRoute");
const categoryRoute = require("./routes/categoryRoute");
const orderRoute = require("./routes/orderRoute");
const userRoute = require("./routes/userRoute");

module.exports = app;

app.use(express.json());

app.use("/api/author", authorRoute);
app.use("/api/book", bookRoute);
app.use("/api/category", categoryRoute);
app.use("/api/order", orderRoute);
app.use("/api/user", userRoute);
app.use("/api/crud", crudRoute);
