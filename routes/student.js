// Including all the dependencies
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Importing the Controller
const studentController = require('../controllers/student');

/*                                                  ROUTES                                                  */


// @route   POST /api/student/add 
// @desc    Adds a new student to the database
// @access  Public 
router.post('/add', studentController.addStudent);

// @route   GET /api/student/all 
// @desc    Get the list of all students
// @access  Public 
router.get('/all', studentController.getAllStudents);

// @route   GET /api/student/one/:id
// @desc    Get Details of a single student by ObjectId
// @access  Public 
router.get('/one/:id', studentController.getOneStudent);

// @route   POST /api/student/edit/:id 
// @desc    Edit a student by ObjectId
// @access  Public 
router.post('/edit/:id', studentController.editOneStudent);

// Storage configuration for the uploaded images using multer. Images will be stored in public/profilePhotos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/profilePhotos'))
    },
    filename: function (req, file, cb) {
        let fragments = file.originalname.split('.');
        const extension = fragments.splice(-1)[0];

        cb(null, mongoose.Types.ObjectId() + '.' + extension);
    }
})

// Upload configuration for the photo. Images have to be less the 1,000,000 bytes in size and should end with .jpg, .jpeg, or .png
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.endsWith('.jpg') && !file.originalname.endsWith('.jpeg') && !file.originalname.endsWith('.png')) {
            return cb('File must be a Image', undefined)
        }
        cb(undefined, true)
    },
    storage: storage
})

// @route   POST /api/student/upload 
// @desc    Uploads a photo to the server
// @access  Public 
router.post('/upload', upload.single('upload'), studentController.uploadPicture);

// @route   GET /api/student/getProfilePic/:profilePicName
// @desc    Returns a profile pic from the given name
// @access  Public 
router.get('/getProfilePic/:profilePicName', studentController.getPicture);

module.exports = router;