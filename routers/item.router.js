const express = require("express");
const router = express.Router();

const ItemMiddleware = require("../middlewares/item.middleware");
const ItemController = require("../controllers/item.controller");

router.get("/", ItemController.viewItems);

router.post("/", ItemMiddleware.validateItemForm, ItemController.createItem);

router.put(
  "/:itemId/",
  ItemMiddleware.ensureItemExists,
  ItemMiddleware.validateItemForm,
  ItemController.editItem
);

router.patch(
  "/:itemId/dec",
  ItemMiddleware.ensureItemExists,
  ItemMiddleware.validateQuantityDecrement,
  ItemController.decrementQuantity
);

router.patch(
  "/:itemId/inc",
  ItemMiddleware.ensureItemExists,
  ItemController.incrementQuantity
);

router.delete(
  "/:itemId/",
  ItemMiddleware.ensureItemExists,
  ItemController.deleteItem
);

router.patch(
  "/:itemId/recover",
  ItemMiddleware.ensureItemExists,
  ItemController.recoverItem
);

module.exports = router;
