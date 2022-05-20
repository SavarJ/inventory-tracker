const Item = require("../models/Item.model");

const viewItems = async (req, res) => {
  const viewDeleted = req.query.viewDeleted === "true";
  const items = await Item.find({ isDeleted: viewDeleted });
  return res.render("index", { items });
};

const createItem = async (req, res) => {
  const { name, price, quantity, description } = req.body;
  const item = new Item({ name, price, quantity, description });
  await item.save();
  return res.redirect("/");
};

module.exports = {
  viewItems,
  createItem,
};
