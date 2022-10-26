const mongoose = require("mongoose");


const policeStationSchema = new mongoose.Schema(
    {
        stationName: {
            type: String,
            required: true,
            trim: true,
        },
        areaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Area',
            required: true,
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        contact: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }

    },
    { timestamps: true }
);



module.exports = mongoose.model("PoliceStation", policeStationSchema);