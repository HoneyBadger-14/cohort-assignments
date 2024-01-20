// const { JWT_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const TOKEN = req.headers.authorization;
    const JWT_TOKEN = TOKEN.split(" ")[1];
    console.log(TOKEN);

    try {
        const decodedValue = jwt.verify(JWT_TOKEN, JWT_SECRET);
        console.log(decodedValue);
        if (decodedValue.USER_NAME) {
            next();
        } else {
            res.status(403).json({
                msg: "Authentication failed"
            })
        }

    } catch (e) {
        res.json({
            msg: "Incorrent inputs"
        })
    }
}

module.exports = adminMiddleware;