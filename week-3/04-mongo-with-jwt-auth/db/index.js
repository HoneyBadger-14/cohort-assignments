const mongoose = require('mongoose');

const MONGO_PSWD = 'harekrishna';
const MONGO_URL = `mongodb+srv://honeybee:${MONGO_PSWD}@honeybee.yhrjpox.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(MONGO_URL);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}