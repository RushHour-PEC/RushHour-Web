const mongoose = require("mongoose");


const areaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        pinCode: {
            type: String,
            required: true,
            trim: true
        },

    },
    { timestamps: true }
);



module.exports = mongoose.model("Area", areaSchema);