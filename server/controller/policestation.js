const { sendUserPassword } = require("../middleware/email");
const PoliceStation = require("../models/policestation")
const User = require("../models/user")
const bcrypt = require("bcrypt");

exports.addTrafficPoliceStation = async (req, res) => {

    const { stationName, areaId, address, contact, username } = req.body

    try {

        const user = await User.findOne({ email: username });

        if (user) {

            return res.status(400).json({ error: "Email already exists." });
        }


        const password = (100000000000).toString(36);



        const val = sendUserPassword(username, password, res);


        if (!val) {
            return res.status(500).json({
                error: "Something went wrong. Please try again."
            })
        }


        const hash_password = await bcrypt.hash(password, 10);

        const _user = new User({
            email: username,
            hash_password,
        });

        const newUser = await _user.save();

        if (!newUser) {
            return res.status(500).json({
                error: "Something went wrong. Please try again."
            })
        }


        const _station = new PoliceStation({
            stationName,
            areaId,
            address,
            contact,
            userId: newUser._id
        });



        const data = await _station.save();

        if (data) {
            return res.status(200).json({
                message: "Traffic Police station added Successfully."
            })
        } else {
            return res.status(500).json({
                error: "Something went wrong. Please try again."
            })
        }

    } catch (err) {

        return res.status(400).json({ error: err.message })
    }


}



exports.getTrafficPoliceStation = async (req, res) => {

    try {
        const stations = await PoliceStation.find({}).exec();

        if (!stations) {
            return res.status(404).json({ error: "No Police stations found" });
        }

        res.status(200).json({ stations });

    } catch (err) {

        res.status(400).json({ error: err.message });
    }



}

