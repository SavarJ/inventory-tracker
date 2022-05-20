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
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

/* --------------------------------- Routes --------------------------------- */
app.use("/", require("./routers/index.router"));

/* --------------------------- Starting the server -------------------------- */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
