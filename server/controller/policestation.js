const { sendUserPassword } = require("../middleware/email");
const PoliceStation = require("../models/policestation")
const User = require("../models/user")
const bcrypt = require("bcrypt");


function generateRandomPassword(length) {

    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charLength));

    }
    return result;

}
exports.addTrafficPoliceStation = async (req, res) => {

    const { stationName, areaId, address, contact, username } = req.body

    try {

        const user = await User.findOne({ email: username });

        if (user) {

            return res.status(400).json({ error: "Email already exists." });
        }



        const password = generateRandomPassword(10);


        const val = await sendUserPassword(username, password);

        if (!val) {
            return res.status(500).json({
                error: "Email could not be sent. Please try again."
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

        return res.status(200).json({ stations });

    } catch (err) {

        return res.status(400).json({ error: err.message });
    }



}

