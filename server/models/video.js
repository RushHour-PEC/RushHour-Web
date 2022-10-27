const mongoose = require("mongoose");


const videoSchema = new mongoose.Schema(
    {

        inputVideoFile: {

            name: {
                type: String,
                required: true
            },
            filePath: {
                type: String,   //url
                required: true
            },
            dateTime: {
                type: Date,
                default: Date.now,
            }

        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        cameraId: {
            type: String,
            ref: "Camera",
            default: "CAM"
            // required: true
        },
        crossroadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CrossRoad',
            default: "CR"
            // required: true
        },
        areaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Area',
            required: true
        },
        videoDetectionStatus: {
            type: Boolean,
            default: false
        },
        detectedVideoFile: {

            name: {
                type: String,
                required: true
            },
            filePath: {
                type: String,   //url
                required: true
            }

        },


    },
    { timestamps: true }
);



module.exports = mongoose.model("Camera", cameraSchema);