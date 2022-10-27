const User = require("../models/user");
const bcrypt = require("bcrypt");


// for internal use only
exports.signupUser = async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email }).exec()

        if (user) {
            res.status(400).json({
                error: "Email already exists."
            })

        }

        const hash_password = await bcrypt.hash(req.body.password, 10);

        const _user = new User({
            ...req.body,
            hash_password,
        });

        const data = await _user.save();

        if (data) {

            return res.status(201).json({
                message: "User created successfully!",
            });

        } else {

            return res.status(500).json({
                error: "Something went wrong. Please try again!"
            })

        }

    } catch (err) {

        res.status(500).json({ error: err.message })
    }

};

// for internal use only
exports.signupAdmin = async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email }).exec();
        if (user) {

            res.status(400).json({
                error: "Email already exists."
            });

        }


        const hash_password = await bcrypt.hash(req.body.password, 10);

        const _user = new User({
            ...req.body,
            hash_password,
            role: "admin",
        });

        const data = _user.save();

        if (data) {
            return res.status(201).json({
                message: "Admin created successfully!",
            });

        } else {
            return res.status(500).json({
                error: "Something went wrong. Please try again."
            })
        }

    } catch (err) {

        res.status(500).json({ error: err.message })

    }

}


exports.signin = async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(404).json({
                error: "No user with this email exists. Please check your email and try again."
            });
        }

        const isMatch = await user.authenticate(req.body.password);
        if (isMatch) {

            const token = await user.generateAuthToken();
            res.cookie("token", token, { expiresIn: "1d" });
            const { _id, name, email, role } = user;
            res.status(200).json({
                token,
                user: {
                    _id,
                    name,
                    email,
                    role,
                },
            });


        } else {

            return res.status(400).json({
                error: "Invalid Password. Please try again.",
            });

        }


    } catch (err) {

        return res.status(500).json({ error: "Something went wrong. Please try again" })
    }

};



exports.signout = (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({
        message: "Signout Successfully",
    });
};