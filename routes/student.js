// Including all the dependencies
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Importing the Model
const Student = require('../models/student');

/*                                                  ROUTES                                                  */


// @route   POST /api/student/add 
// @desc    Adds a new student to the database
// @access  Public 
router.post('/add', async (req, res) => {
    try {
        const { name, email, phone, photo, degree } = req.body;
        if (!name || !email || !phone || !photo || !degree) {
            throw "Please enter all the fields"
        }
        const student = await Student.findOne({ email })
        if (student) {
            throw "Student with the same email already exists"
        }
        const newStudent = new Student({
            name,
            email,
            phone,
            photo,
            degree
        })
        await newStudent.save()
        res.status(200).json({ error: false, newStudent })
    } catch (e) {
        res.status(400).json({ error: true, msg: String(e) })
    }
})

// @route   GET /api/student/all 
// @desc    Get the list of all students
// @access  Public 
router.get('/all', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ error: false, students })
    } catch (e) {
        res.status(400).json({ error: true, msg: String(e) })
    }
})

// @route   GET /api/student/one/:email
// @desc    Get Details of a single student by email
// @access  Public 
router.get('/one/:email', async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.params.email })
        if (!student) {
            throw "No such student exists"
        }
        res.status(200).json({ error: false, student })
    } catch (e) {
        res.status(400).json({ error: true, msg: String(e) })
    }
})

// @route   POST /api/student/edit/:email 
// @desc    Edit a student by email
// @access  Public 
router.post('/edit/:email', async (req, res) => {
    try {
        var student = await Student.findOne({ email: req.params.email })
        if (!student) {
            throw "No such student exists"
        }
        const { name, email, phone, photo, degree } = req.body;
        student.name = name;
        student.email = email;
        student.phone = phone;
        student.degree = degree;
        student.photo = photo;
        await student.save();
        res.status(200).json({ error: false, student })
    } catch (e) {
        res.status(400).json({ error: true, msg: String(e) })
    }
})

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
router.post('/upload', upload.single('upload'), async (req, res) => {
    try {
        var filename = `${process.env.BASEURL}/api/student/getProfilePic/${req.file.filename}`;
        res.status(200).json({ error: false, filename })
    } catch (e) {
        res.status(400).json({ error: true, msg: String(e) })
    }
})

// @route   GET /api/student/getProfilePic/:profilePicName
// @desc    Returns a profile pic from the given name
// @access  Public 
router.get('/getProfilePic/:profilePicName', async (req, res) => {
    try {
        const file = fs.createReadStream(path.join(path.join(__dirname, '../public/profilePhotos'), req.params.profilePicName))
        if (!file) {
            throw "Image Does Not Exist"
        }
        res.setHeader('Content-Type', 'image/jpg');
        file.pipe(res)
    } catch (e) {
        res.status(400).json({ error: true, msg: String(e) })
    }
})

module.exports = router;