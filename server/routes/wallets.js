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
 * Genera un proceso de pago
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

/**
 * Confirmar un proceso de pago
 *
 */
router.put("/payment", (req, res) => {
  const options = {
    method: "paymentConfirm",
    data: {
      sessionToken: req.query.sessionToken,
      token: req.query.token,
    },
    res,
  };

  //Consumir el WebService
  doRequestSoap("payment", options);
});

module.exports = router;
