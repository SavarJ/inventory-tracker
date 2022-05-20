const express = require("express");
const router = express.Router();

const IndexController = require("../controllers/index.controller");
const PageNotFoundController = require("../controllers/404.controller");

router.get("/", IndexController.redirectToItems);

router.all("/", PageNotFoundController.pageNotFound);

module.exports = router;
