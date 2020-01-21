const router = require("express").Router;
const { celebrate, errors, Joi, Segments } = require("celebrate");

module.exports = {
  celebrate,
  errors,
  router,
  Segments,
  types: Joi.types()
};
