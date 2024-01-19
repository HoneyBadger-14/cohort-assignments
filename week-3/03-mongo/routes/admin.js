const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const USER_NAME = req.body.username;
    const PASSWORD = req.body.password;

    await Admin.create({
        username : USER_NAME,
        password : PASSWORD
    })

    res.json({
        message : "Admin created succesfully"
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description
    const imageLink = req.body.imageLink
    const price = req.body.price

    const NEW_COURSE = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        message: 'Course created succesfully',
        courseId: NEW_COURSE._id
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