const { Admin } = require("../db");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const USER_NAME = req.headers.username;
    const PASSWORD = req.headers.password;

    Admin.findOne({
        username: USER_NAME,
        password: PASSWORD
    })
    .then((value) => {
        if(value) {
            next();
        } else {
            res.status(403).json({
                msg : "Admin doesnot exist"
            })
        }
    })
}

module.exports = adminMiddleware;