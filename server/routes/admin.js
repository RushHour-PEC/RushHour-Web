const express = require("express");
const { signupAdmin, signin, signout } = require("../controller/auth");
const { requireSignin, adminMiddleware } = require("../middleware/auth");

const router = express.Router();


router.post("/signup", signupAdmin);
router.post("/signin", signin);
router.post("/signout", requireSignin, adminMiddleware, signout);


module.exports = router;
