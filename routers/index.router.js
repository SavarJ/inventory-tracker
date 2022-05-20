const express = require("express");
const router = express.Router();

const Item = require("../models/Item.model");

router.get("/", async (req, res) => {
  const items = await Item.find({});
  return res.render("index", { items });
});

module.exports = router;
