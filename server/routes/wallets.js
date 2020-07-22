const router = require("express").Router();
const { validationResult } = require("express-validator");
const { walletUpdateRequest } = require("../requests/wallet");
const { doRequestSoap } = require("../services");

/**
 * Consultar el Saldo Actual de una Billetera
 *
 */
router.get("/balance", (req, res, next) => {
  const options = {
    method: "getBalance",
    data: {
      dni: req.query.dni,
      mobile: req.query.mobile,
    },
    res,
  };
  //Consumir el WebService
  doRequestSoap("wallet", options);
});

/**
 * Recargar el Saldo de la Billetera
 *
 */
router.put("/recharge", walletUpdateRequest(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "¡Ha ocurrido un error!",
      errors: errors.array(),
    });
  }

  const options = {
    method: "recharge",
    data: req.body,
    res,
  };

  //Consumir el WebService
  doRequestSoap("wallet", options);
});

/**
 *
 */
router.post("/payment", (req, res) => {
  const options = {
    method: "pay",
    data: req.body,
    res,
  };

  //Consumir el WebService
  doRequestSoap("payment", options);
});

module.exports = router;
