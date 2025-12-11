const express = require('express');
const connectDB = require('./config/database');
const User = require("./Model/user")

const  app = express();

app.post("/signUp", async (req,res)=>{
    const userObj = new User({
        firstName:"Ananya",
        lastName :"Shukla",
        emailId :"a@gmail.com",
        password:"a123@",
        age:23,
        gender:"Female"
    })
try{
    await userObj.save();
    res.status(201).json({message:"user signed up successfully"})
}  
catch(err){
    res.status(404).json(err.message,"user signup failed !!")
}
})





connectDB().then(()=>{
    console.log("database connection done succesfully")
app.listen(7000, ()=>{
    console.log("server start....")
});




}).catch(()=>{
    console.log("connection not done succesfully")
})


