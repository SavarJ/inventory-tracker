const express = require("express");
const router = express.Router();

const Item = require("../models/Item.model");

router.get("/", async (req, res) => {
  const items = await Item.find({});
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

module.exports = router;
