const express = require("express");
const router = express.Router();
const handlerController = require("../controllers/crudController")

router
  .route("/:model")
  .get(handlerController.getAll)
  .post(handlerController.create);
router
  .route("/:model/:pk")
  .get(handlerController.getExactly)
  .post(handlerController.edit)
  .delete(handlerController.delete);

module.exports = router;
