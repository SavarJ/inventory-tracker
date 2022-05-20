const Item = require("../models/Item.model");

const ensureItemExists = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const possibleItem = await Item.findById(itemId);
    if (!possibleItem) {
      throw new Error("Item not found");
    }
    req.item = possibleItem;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  ensureItemExists,
};
