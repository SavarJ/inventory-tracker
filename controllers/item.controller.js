const Item = require("../models/Item.model");

const viewItems = async (req, res, next) => {
  const viewDeleted = req.query.viewDeleted === "true";
  try {
    const items = await Item.find({ isDeleted: viewDeleted });
    return res.render("items", { items });
  } catch (error) {
    return next(error);
  }
};

const createItem = async (req, res, next) => {
  const { name, price, quantity, description } = req.bodyObject;
  const item = new Item({ name, price, quantity, description });
  try {
    await item.save();
    return res.redirect("/items");
  } catch (error) {
    return next(error);
  }
};

const editItem = async (req, res, next) => {
  const { name, price, quantity, description } = req.bodyObject;
  const { item } = req;
  item.name = name;
  item.price = price;
  item.quantity = quantity;
  item.description = description;
  try {
    await item.save();
    return res.redirect("/items");
  } catch (error) {
    return next(error);
  }
};

const decrementQuantity = async (req, res, next) => {
  const { item } = req;
  item.quantity--;
  try {
    await item.save();
    return res.redirect("/items");
  } catch (error) {
    return next(error);
  }
};

const incrementQuantity = async (req, res, next) => {
  const { item } = req;
  item.quantity++;
  try {
    await item.save();
    return res.redirect("/items");
  } catch (error) {
    return next(error);
  }
};

const deleteItem = async (req, res, next) => {
  const { deletionComment } = req.body;
  const { item } = req;
  item.isDeleted = true;
  item.deletionComment = deletionComment;
  try {
    await item.save();
    return res.redirect("/items");
  } catch (error) {
    return next(error);
  }
};

const recoverItem = async (req, res, next) => {
  const { itemId } = req.params;
  const { item } = req;
  item.isDeleted = false;
  item.deletionComment = null;
  try {
    await item.save();
    return res.redirect("/items");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  viewItems,
  createItem,
  editItem,
  decrementQuantity,
  incrementQuantity,
  deleteItem,
  recoverItem,
};
