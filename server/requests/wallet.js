const { body } = require("express-validator");

module.exports.walletUpdateRequest = () => [
  body("dni").notEmpty().withMessage("Campo obligatorio"),
  body("mobile").notEmpty().withMessage("Campo obligatorio"),
  body("amount").notEmpty().withMessage("Campo obligatorio"),
];
