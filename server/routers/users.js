const router = require("express").Router();
const { validationResult } = require("express-validator");
const { userCreateRequest } = require("../requests/user");

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

  try {
    //Consumir el WebService
    res.json({
      code: 201,
      message: "Creado exitosamente",
      payload: req.body,
    });
  } catch (err) {
    res.status(404).json({
      code: 1002,
      message: "¡Ha ocurrido un error!",
      errors: err,
    });
    next(err);
  }
});

module.exports = router;
