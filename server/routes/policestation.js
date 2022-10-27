const express = require("express");
const { requireSignin, adminMiddleware } = require("../middleware/auth");
const { addTrafficPoliceStation, getTrafficPoliceStation } = require('../controller/policestation');

const router = express.Router();


router.post("/add/trafficPoliceStation", requireSignin, adminMiddleware, addTrafficPoliceStation);
router.get("/getTrafficPoliceStations", getTrafficPoliceStation);

module.exports = router;
