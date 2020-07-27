const express = require('express');
const router = express.Router();

const Student = require('../models/student');

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

router.get('/all', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ error: false, students })
    } catch (e) {
        res.status(400).json({ error: true, msg: String(e) })
    }
})

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
        await student.save();
        res.status(200).json({ error: false, student })
    } catch (e) {
        res.status(400).json({ error: true, msg: String(e) })
    }
})

module.exports = router;