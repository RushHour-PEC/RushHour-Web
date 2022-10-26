const Area = require('../models/area')

exports.getArea = async (req, res) => {

    try {
        const area = await Area.find({}).exec();

        if (!area) {
            return res.status(404).json({ error: "No Area found" });
        }

        res.status(200).json({ area });

    } catch (err) {

        res.status(400).json({ error: err.message });
    }



}

exports.addArea = async (req, res) => {

    const { name, pinCode } = req.body;
    try {

        const area = await Area.findOne({ name: name }).exec();

        if (area) {
            return res.status(400).json({
                error: "Area already added."
            })
        }

        const _area = new Area({
            name,
            pinCode
        });

        const data = await _area.save();

        if (data) {
            return res.status(200).json({
                message: "Area added successfully."
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


exports.updateArea = async (req, res) => {

    const _id = req.params.id
    const updates = Object.keys(req.body);
    try {

        const area = await Area.findOne({ _id });

        if (!area) {

            res.status(404).json({
                error: "Area not found."
            })

        }

        updates.forEach((update) => {
            area[update] = req.body[update]
        })

        const data = await area.save();

        if (data) {
            res.status(200).json({ message: "Area Updated Successfully." })
        } else {
            res.status(500).json({ error: "Something went wrong. Please try again." })
        }



    } catch (err) {

        res.status(400).json({ error: err.message })

    }


}




