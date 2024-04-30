const express = require("express");
const app=express();
const path= require("path");
const bodyParser = require("body-parser"); 
const collection1=require('./connect');
const encoded = bodyParser.urlencoded({extended:false});
const static_path=path.join(__dirname);

app.use(express.static(static_path));
app.use(express.json())

app.use(express.urlencoded({extended:false}));

app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname,'signup.html'));
});


app.get('/login',(req,res)=>{
  res.sendFile(__dirname+'/login.html');
})
app.post('/signup',encoded,async(req,res)=>{
  let data = await collection1(req.body);
  data.save()
    .then(()=>{
      res.sendFile(__dirname+'/login.html');
    })
    .catch(err => console.log(err))
})
app.post('/loggedin',async(req,res)=>{
  const username1 = req.body.username;
  const password1 = req.body.password;
  collection1.findOne({fname:username1,password:password1})
  .then(data=>{
    if(data){
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
  res.sendFile(__dirname+'/index.html')
})
app.listen(2010, ()=>{
  console.log("Server is running on port 2010")
})