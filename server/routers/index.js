const router = require("express").Router();

router.use("/api/users", require("./users"));
router.use("/api/wallets", require("./wallets"));
router.use("/api/payments", require("./payments"));

module.exports = router;
