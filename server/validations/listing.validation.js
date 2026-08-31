const { body } = require("express-validator");

exports.createListingValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required."),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required."),

  body("age")
    .isInt({ min: 18 })
    .withMessage("Age must be at least 18."),

  body("height")
    .trim()
    .notEmpty()
    .withMessage("Height is required."),

  body("weight")
    .trim()
    .notEmpty()
    .withMessage("Weight is required."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required."),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required."),

  body("state")
    .trim()
    .notEmpty()
    .withMessage("State is required."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required."),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number."),
];