const router = require("express").Router();
const { validationResult } = require("express-validator");
const { walletUpdateRequest } = require("../requests/wallet");

/**
 * Consultar el Saldo Actual de una Billetera
 *
 */
router.get("/balance", (req, res, next) => {
  try {
    res.json({
      code: 200,
      message: "Creado exitosamente",
      payload: req.params,
    });
  } catch (err) {
    res.status(404).json({
      code: 2002,
      message: "Ha Ocurrido un error",
      errors: err,
    });

    next(err);
  }
});

/**
 * Recargar el Saldo de la Billetera
 *
 */
router.post("/recharge", walletUpdateRequest(), (req, res, next) => {
  try {
    // Recargar

    res.json({
      code: 201,
      message: "Creado exitosamente",
      payload: req.params,
    });
  } catch (err) {
    res.status(404).json({
      code: 404,
      message: "Ha Ocurrido un error",
      errors: err,
    });

    next(err);
  }
});

/**
 *
 */
router.put("/:walletId/payment", walletUpdateRequest(), (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 1001,
      message: "¡Ha ocurrido un error!",
      errors: errors.array(),
    });
  }

  try {
    res.json({
      message: "Creado exitosamente",
      payload: req.body,
    });
  } catch (err) {
    res.json({
      status: -1,
      rslt: null,
      err,
    });
    next(err);
  }
});

module.exports = router;
