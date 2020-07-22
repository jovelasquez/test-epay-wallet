const router = require("express").Router();
const {
  validationResult
} = require('express-validator');


/**
 * Generar un proceso de pago
 * 
 */
router.post("/checkout", (req, res, next) => {
  try {


    res.json({
      message: 'Creado exitosamente',
      payload: req.params
    });
  } catch (err) {
    res.status(404).json({
      code: 3002,
      message: 'Ha Ocurrido un error',
      errors: err
    });

    next(err);
  }
});

module.exports = router;
