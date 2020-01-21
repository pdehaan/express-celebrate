const BodyParser = require("body-parser");
const express = require("express");

const { errors } = require("./lib");
const routes = require("./routes");

const app = express();
app.use(BodyParser.json());
app.use("/", routes);
app.use(errors());

module.exports = app;
