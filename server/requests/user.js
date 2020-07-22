const { body } = require("express-validator");

module.exports.userCreateRequest = () => [
  body("dni").notEmpty().withMessage("Campo obligatorio"),
  body("name").notEmpty().withMessage("Campo obligatorio"),
  body("email").notEmpty().withMessage("Campo obligatorio"),
  body("email").isEmail().withMessage("Debe ser un email valido"),
  body("mobile").notEmpty().withMessage("Campo obligatorio"),
];
