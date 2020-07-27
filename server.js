const express = require('express');
const app = express();

const bodyParser = require("body-parser");

const mongoose = require('mongoose');

// mongoose.promise = global.Promise;
// mongoose.connect(process.env.MongoURI,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}, (err,db)=> {
//     if(err)
//     console.log(err);

//     else
//     console.log('Database Connected...');
// });

app.get("/api", (req, res) => {
    res.json({message: "API running"});
})

app.use(bodyParser.json());

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server started on port ${process.env.PORT || 5000}`);
});