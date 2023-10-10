const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

function expressConfig(app) {
  app.use(express.static(path.resolve(__dirname, "../public")));
  app.use(express.urlencoded({ extended: false })); // body parser, upon read data from form, using req.body
  app.use(cookieParser());
}

module.exports = expressConfig;
