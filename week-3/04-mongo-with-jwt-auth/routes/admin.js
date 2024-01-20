const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
// const { JWT_SECRET }  = require("../config/config");
const jwt = require("jsonwebtoken");
const router = Router();
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const USER_NAME = req.body.username;
    const PASSWORD = req.body.password;

    await Admin.create({
        username : USER_NAME,
        password: PASSWORD
    })
    res.json({
        msg : 'Admin created succesfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const USER_NAME = req.body.username;
    const PASSWORD = req.body.password;

    console.log(USER_NAME + " " + PASSWORD);
    console.log(JWT_SECRET);
    const USER = await Admin.find({
        USER_NAME, PASSWORD
    })

    if (USER) {
        const TOKEN = jwt.sign({
            USER_NAME
        }, JWT_SECRET);
        res.json({ TOKEN})
    } else {
        res.status(411).json({
            msg: "Incorrect email or password"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const RESPONSE = await Course.find({});

    res.json({
        courses: RESPONSE
    })

});

module.exports = router;