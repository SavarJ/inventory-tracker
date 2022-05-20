const Item = require("../models/Item.model");

const ensureItemExists = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const possibleItem = await Item.findById(itemId);
    if (!possibleItem) {
      throw new Error("Item not found");
    }
  } catch (err) {
    return next(err);
  }
  return next();
};
