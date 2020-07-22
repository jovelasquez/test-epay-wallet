const router = require("express").Router();
const soap = require("soap");
const { validationResult } = require("express-validator");
const { userCreateRequest } = require("../requests/user");
const { getWSDL, parseResponse } = require("../utils/index");

/**
 * Crear un nuevo usuario
 *
 */
router.post("/", userCreateRequest(), (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "¡Ha ocurrido un error!",
      errors: errors.array(),
    });
  }

  //Consumir el WebService
  const wsdl = getWSDL("user");
  soap.createClient(wsdl, function (err, client) {
    if (err) {
      console.log(err);
    }

    client.createUser(req.body, function (err, result, envelope, soapHeader) {
      if (err) {
        console.log(err);
      }

      return parseResponse(res, result, "$value");
    });
  });
});

module.exports = router;
