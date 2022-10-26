const mongoose = require("mongoose");


const cameraSchema = new mongoose.Schema(
    {

        code: {
            type: String,
            required: true,
            trim: true
        },
        crossroadId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'CrossRoad', required: true
        },
        areaId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true
        }

    },
    { timestamps: true }
);



module.exports = mongoose.model("Camera", cameraSchema);