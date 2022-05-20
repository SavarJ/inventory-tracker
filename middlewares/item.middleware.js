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

const validateItemForm = (req, res, next) => {
  const { name, price, quantity, description } = req.body;
  if (!name || price == null || quantity == null || !description) {
    return next(new Error("All fields are required"));
  }

  if (price < 0) {
    return next(new Error("Price must be a positive number"));
  }

  if (quantity < 0) {
    return next(new Error("Quantity must be a positive number"));
  }

  req.bodyObject = { name, price, quantity, description };
  return next();
};

const validateQuantityDecrement = (req, res, next) => {
  const { item } = req;
  if (item.quantity === 0) {
    return next(new Error("Item quantity cannot be negative"));
  }
  return next();
};

module.exports = {
  ensureItemExists,
  validateItemForm,
  validateQuantityDecrement,
};
