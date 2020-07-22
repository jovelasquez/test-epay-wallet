const router = require("express").Router();
const { validationResult } = require("express-validator");
const { userCreateRequest } = require("../requests/user");
const { doRequestSoap } = require("../services");

/**
 * Crear un nuevo usuario
 *
 */
router.post("/", userCreateRequest(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "¡Ha ocurrido un error!",
      errors: errors.array(),
    });
  }

  const options = {
    method: "createUser",
    data: req.body,
    res,
  };
  //Consumir el WebService
  doRequestSoap("user", options);
});

module.exports = router;
