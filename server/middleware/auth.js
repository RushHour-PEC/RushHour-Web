const jwt = require("jsonwebtoken");
const User = require('../models/user');

exports.requireSignin = async (req, res, next) => {

    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded._id })


            if (!user) {
                throw new Error();
            }

            req.user = user;
            next();

        }
    } catch (err) {
        res.status(401).send({ error: 'Authentication required.' });
    }

}


exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(400).json({ message: "User access denied" });
    }
    next();
};


exports.adminMiddleware = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(400).json({ message: "Admin access denied" });
    }
    next();
}


