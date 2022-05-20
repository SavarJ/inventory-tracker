const express = require("express");
const methodOverride = require("method-override");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/* ----------------------- Initializing express server ---------------------- */
const app = express();
const PORT = process.env.PORT || 5000;

/* --------------------- Configuring MongoDB Connection --------------------- */
require("./config/db.config")();

/* ----------------------- Middlewares and View Engine ---------------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

/* --------------------------------- Routes --------------------------------- */
const indexRouter = require("./routers/index.router");
const itemRouter = require("./routers/item.router");
const pageNotFoundRouter = require("./routers/404.router");

app.use("/", indexRouter);
app.use("/:itemId/", itemRouter);
app.use("*", pageNotFoundRouter);

/* ------------------------------ Error Handler ----------------------------- */
app.use((err, req, res, next) => {
  console.error("An error occurred: ", err);
  res.render("error", { error: err });
});

/* --------------------------- Starting the server -------------------------- */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
