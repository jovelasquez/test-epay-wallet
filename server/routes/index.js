const router = require("express").Router();

router.use("/api/users", require("./users"));
router.use("/api/wallets", require("./wallets"));

module.exports = router;
