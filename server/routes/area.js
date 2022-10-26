const express = require('express');
const { getArea, addArea, updateArea } = require('../controller/area');
const { requireSignin, adminMiddleware } = require('../middleware/auth');
const router = express.Router();


router.get('/getArea', getArea);
router.post('/addArea', requireSignin, adminMiddleware, addArea);
router.patch('/updateArea/:id', requireSignin, adminMiddleware, updateArea);


module.exports = router;