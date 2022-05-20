const express = require("express");
const router = express.Router();

const Item = require("../models/Item.model");

router.get("/", async (req, res) => {
  const viewDeleted = req.query.viewDeleted === "true";
  const items = await Item.find({ isDeleted: viewDeleted });
  return res.render("index", { items });
});

router.post("/", async (req, res) => {
  const { name, price, quantity, description } = req.body;
  const item = new Item({ name, price, quantity, description });
  await item.save();
  return res.redirect("/");
});

router.put("/:itemId", async (req, res) => {
  const { name, price, quantity, description } = req.body;
  const item = await Item.findById(req.params.itemId);
  item.name = name;
  item.price = price;
  item.quantity = quantity;
  item.description = description;
  await item.save();
  return res.redirect("/");
});

router.patch("/:itemId/dec", async (req, res) => {
  const { itemId } = req.params;
  const item = await Item.findById(itemId);
  item.quantity--;
  await item.save();
  return res.redirect("/");
});

router.patch("/:itemId/inc", async (req, res) => {
  const { itemId } = req.params;
  const item = await Item.findById(itemId);
  item.quantity++;
  await item.save();
  return res.redirect("/");
});

router.delete("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { deletionComment } = req.body;
  const item = await Item.findById(itemId);
  item.isDeleted = true;
  item.deletionComment = deletionComment;
  await item.save();
  return res.redirect("/");
});

router.patch("/:itemId/recover", async (req, res) => {
  const { itemId } = req.params;
  const item = await Item.findById(itemId);
  item.isDeleted = false;
  item.deletionComment = null;
  await item.save();
  return res.redirect("/");
});

module.exports = router;
