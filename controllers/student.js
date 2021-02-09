// Including all the dependencies
const path = require("path");
const fs = require("fs");

// Importing the Model
const Student = require("../models/student");

exports.addStudent = async (req, res) => {
  try {
    const { name, email, phone, photo, degree } = req.body;
    if (!name || !email || !phone || !photo || !degree) {
      throw "Please enter all the fields";
    }
    const student = await Student.findOne({ email });
    if (student) {
      throw "Student with the same email already exists";
    }
    const newStudent = new Student({
      name,
      email,
      phone,
      photo,
      degree,
    });
    await newStudent.save();
    res.status(200).json({ error: false, newStudent });
  } catch (e) {
    res.status(400).json({ error: true, msg: String(e) });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ error: false, students });
  } catch (e) {
    res.status(400).json({ error: true, msg: String(e) });
  }
};

exports.getOneStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    if (!student) {
      throw "No such student exists";
    }
    res.status(200).json({ error: false, student });
  } catch (e) {
    res.status(400).json({ error: true, msg: String(e) });
  }
};

exports.editOneStudent = async (req, res) => {
  try {
    var student = await Student.findOne({ _id: req.params.id });
    if (!student) {
      throw "No such student exists";
    }
    const { name, email, phone, photo, degree } = req.body;
    student.name = name;
    student.email = email;
    student.phone = phone;
    student.degree = degree;
    student.photo = photo;
    await student.save();
    res.status(200).json({ error: false, student });
  } catch (e) {
    res.status(400).json({ error: true, msg: String(e) });
  }
};

exports.uploadPicture = async (req, res) => {
  try {
    var filename = `${process.env.BASEURL}/api/student/getProfilePic/${req.file.filename}`;
    res.status(200).json({ error: false, filename });
  } catch (e) {
    res.status(400).json({ error: true, msg: String(e) });
  }
};

exports.getPicture = async (req, res) => {
  try {
    const file = fs.createReadStream(
      path.join(
        path.join(__dirname, "../public/profilePhotos"),
        req.params.profilePicName
      )
    );
    if (!file) {
      throw "Image Does Not Exist";
    }
    res.setHeader("Content-Type", "image/jpg");
    file.pipe(res);
  } catch (e) {
    res.status(400).json({ error: true, msg: String(e) });
  }
};
