const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })

    res.json({
        message: "User created succesfully"
    })
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