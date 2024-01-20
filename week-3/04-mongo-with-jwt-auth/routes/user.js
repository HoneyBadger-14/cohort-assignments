const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config/config");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const USER_NAME = req.body.username;
    const PASSWORD = req.body.password;

    // check if a user with this username already exists
    await User.create({
        username: USER_NAME,
        password: PASSWORD
    })

    res.json({
        message: 'User created successfully'
    })
});

router.post('/signin', async (req, res) => {  
    // Implement admin signup logic
    const USER_NAME = req.body.username;
    const PASSWORD = req.body.password ;
    const USER = await User.find({
        USER_NAME, PASSWORD
    })

    if (USER) {
        const TOKEN = jwt.sign({USER_NAME}, JWT_SECRET);
        res.json( TOKEN );
    } else {
        res.status(411).json({
            msg : "Incorrect email or password"
        })
    }
});

router.get('/courses', async(req, res) => {
    const RESPONSE = await Course.find({})
    res.json({
        courses : RESPONSE
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;

    console.log(req.params);
    console.log(username + " : " + courseId);
    await User.updateOne({
        username: username
    }, {
        "$push" : {
            purchasedCourses : courseId
        }
    });
    res.json({
        message : 'Purchase complete'
    });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    
    const USER = await User.findOne({
        username: req.headers.username
    });
    console.log(USER.purchasedCourses);
    const COURSES = await Course.find({
        _id : {
            "$in": USER.purchasedCourses
        }
    });

    res.json({
        courses : COURSES
     })
});

module.exports = router