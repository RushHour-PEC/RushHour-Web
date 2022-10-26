const mongoose = require("mongoose");


const crossroadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        areaId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true
        },

    },
    { timestamps: true }
);



module.exports = mongoose.model("CrossRoad", crossroadSchema);