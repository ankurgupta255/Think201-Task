const express = require("express");
const app = express();

// Middleware utilities
const bodyParser = require("body-parser");

// Config variables
require("dotenv").config({ path: ".env" });

// Mongoose
const mongoose = require("mongoose");

//Connecting to the database
mongoose.promise = global.Promise;
mongoose.connect(
  process.env.MongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, db) => {
    if (err) console.log(err);
    else console.log("Database Connected...");
  }
);

// Test API
app.get("/api", (req, res) => {
  res.json({ message: "API running" });
});

//Getting data in json format
app.use(bodyParser.json());

// Importing Routers
const studentRouter = require("./routes/student");

// Mounting the routes
app.use("/api/student", studentRouter);

// Starting the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
