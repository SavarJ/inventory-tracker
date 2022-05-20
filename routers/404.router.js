const express = require("express");
const router = express.Router();

const PageNotFoundController = require("../controllers/404.controller");

router.all("*", PageNotFoundController.pageNotFound);

module.exports = router;
