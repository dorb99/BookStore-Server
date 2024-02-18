const sequelize = require("../server");
const { DataTypes } = require("sequelize");

const Author = sequelize.define(`Author`, {
  name: { type: DataTypes.STRING, allowNull: false },
});


module.exports = Author;
