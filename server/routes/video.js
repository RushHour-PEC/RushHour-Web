// const express = require("express");
// const { userMiddleware, requireSignin } = require("../middleware/auth");
// const multer = require("multer");
// const path = require("path");
// const { addVideo } = require("../controller/video");
// const router = express.Router();



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(path.dirname(__dirname), "uploads"));
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     },
// });


// const upload = multer({
//     storage,
//     fileFilter(req, file, cb) {

//         if (!file.originalname.match(/\.(png|jpg|jpeg|mp4)$/)) {
//             return cb(new Error('File format should be .png/.jpg/.jpeg/.mp4'))
//         }

//         cb(undefined, true)  // accepting the upload
//     }

// });


// router.post("/uploadVideo", requireSignin, userMiddleware, upload.single("inputVideoFile"), (req, res) => {
//     console.log("file = " + req.file.originalname);
//     console.log("req = " + req);
// });
// // router.get("/viewVideo", getTrafficPoliceStation);

// module.exports = router;
