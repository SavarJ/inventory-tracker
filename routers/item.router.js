const express = require("express");
const router = express.Router();

const ItemMiddleware = require("../middlewares/item.middleware");
const ItemController = require("../controllers/item.controller");

router.use(ItemMiddleware.ensureItemExists);

router.put("/", ItemController.editItem);

router.patch("/dec", ItemController.decrementQuantity);

router.patch("/inc", ItemController.incrementQuantity);

router.delete("/", ItemController.deleteItem);

router.patch("/recover", ItemController.recoverItem);

module.exports = router;
