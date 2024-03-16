const jwt = require("jsonwebtoken");
const User = require('../models/user');
require("dotenv").config();

const auth = (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if(!token) {
            return res.status(401).json({ message: `Unauthorized!` });
        }

        const userObj = jwt.verify(token, process.env.SECRET_KEY);
        req.user = userObj;
        next();
    } catch(err) {
        console.log(err);
        return res.status(501).json({ success: false, error: `Error in Backend` })
    }
};

module.exports = { auth };
