const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config/config");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const TOKEN = req.headers.authorization;
    const JWT_TOKEN = TOKEN.split(" ")[1];
    console.log(TOKEN);
    console.log(JWT_TOKEN);
    console.log(JWT_SECRET);
    const decodedValue = jwt.verify(JWT_TOKEN, JWT_SECRET);

    if (decodedValue.USER_NAME) {
        req.username = decodedValue.username;
        req.randomData = "adding some data";
        next();
    } else {
        res.status(403).json({
            msg: "User Authentication failed"
        })
    }

}

module.exports = userMiddleware;