const express = require("express");
const router = express.Router();

router.use("/checkUser", require("./routes/loginRoute.js"));
router.use("/create", require("./routes/registerRoute.js"));
router.use("/enterOTP", require("./routes/enterOTP.js"));
router.use("/checkOTP", require("./routes/checkOTP.js"));


/* app.use("/register", require("./routes/registerRoute")); */
module.exports = router;
