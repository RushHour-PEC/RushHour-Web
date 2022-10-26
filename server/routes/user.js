const express = require('express');
const { signin, signupUser, signout } = require('../controller/auth');
const { requireSignin, adminMiddleware, userMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/signup', signupUser);
router.post('/signin', signin);
router.post('/signout', requireSignin, userMiddleware, signout);

module.exports = router;