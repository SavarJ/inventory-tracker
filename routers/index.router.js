const express = require("express");
const router = express.Router();

const IndexController = require("../controllers/index.controller");

router.get("/", IndexController.viewItems);

router.post("/", IndexController.createItem);

router.put("/:itemId", IndexController.editItem);

router.patch("/:itemId/dec", IndexController.decrementQuantity);

router.patch("/:itemId/inc", IndexController.incrementQuantity);

router.delete("/:itemId", IndexController.deleteItem);

router.patch("/:itemId/recover", IndexController.recoverItem);

module.exports = router;
