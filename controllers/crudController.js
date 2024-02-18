



exports.create = async (req, res) => {
  const Model = require(`../models/${req.params.model}Model`);
  try {
    const newInfo = await Model.create(req.body);
    res.status(200).json({ status: "success", data: newInfo });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed to create", massage: error.message });
  }
};

exports.getExactly = async (req, res) => {
  const Model = require(`../models/${req.params.model}Model`);
  const id = req.params.pk;
  try {
    const exactInfo = await Model.findOne({ where: { id: id } });
    if (!exactInfo) {
      res.status(404).json({
        status: "failed",
        message: "Resource not found",
      });
    } else {
      res.status(200).json({ status: "success", data: exactInfo });
    }
  } catch (error) {
    res.status(501).json({ status: "failed to find", massage: error });
  }
};

exports.getAll = async (req, res) => {
  const Model = require(`../models/${req.params.model}Model`);
  try {
    const allInfo = await Model.findAll();
    res.status(200).json({ status: "success", data: allInfo });
  } catch (error) {
    res.status(502).json({ status: "failed to get all", massage: error });
  }
};

exports.edit = async (req, res) => {
  const Model = require(`../models/${req.params.model}Model`);
  const id = req.params.pk;
  try {
    const editedInfo = await Model.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ status: "success", data: editedInfo });
  } catch (error) {
    res.status(503).json({ status: "failed to edit", massage: error });
  }
};

exports.delete = async (req, res) => {
  const Model = require(`../models/${req.params.model}Model`);
  const id = req.params.pk;
  try {
    const deletedInfo = await Model.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ status: "success", data: deletedInfo });
  } catch (error) {
    res.status(504).json({ status: "failed to delete", massage: error });
  }
};
