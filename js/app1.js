const express = require("express")
require("./connect")
const app=express();
const body1=require('body-parser');
const student1 = require("./connect");
const encoded=body1.urlencoded({extended:false})
app.get("/",(req,res)=>{
  res.sendFile(__dirname+'/public/signup.html');
})
app.post('/signup',encoded,async(req,res)=>{
  let student = await student1(req.body);
  student.save()
    .then(()=>{
      res.send(`
        <h2>User registered successfully!</h2>
        <p>Click <a href="/login">here</a> to login or 
        click <a href="/">here</a> for register another user.</p>
      `);
    })
    .catch(err => console.log(err))
})
app.get('/login',(req,res)=>{
  res.sendFile(__dirname+'/public/login.html')
})
app.post('/loggedin',encoded,async(req,res)=>{
  const username1 = req.body.username;
  const password1 = req.body.password;
  student1.findOne({fname:username1,password:password1})
  .then(student=>{
    if(student){
      res.redirect('/dashboard')
    } else{
      res.status(401).send('Invalid username or password');
    }
  })
  .catch(error=>{
    console.error(error);
    res.status(500).send('Internal Server Error');
  });
})
app.get('/dashboard',(req,res)=>{
  res.send("Welcome User")
})
app.listen(8000, ()=>{
  console.log("Server is running on port 8000")
})