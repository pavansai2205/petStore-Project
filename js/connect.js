const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/project")
.then(()=>{
  console.log("Connection succesfull");
})
.catch((err)=>{
  console.log(`No connection ${err}`)
})

const signupsch = new mongoose.Schema({
  fname:{
    type:String,
    required:true,
    trim:true
  },
  lname:{
    type:String,
    required:true,
     trim:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    trim:true
  }
})
const Student = mongoose.model("Register", signupsch);
module.exports = Student;