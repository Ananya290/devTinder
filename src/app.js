const express = require('express');
const connectDB = require('./config/database');
const User = require("./Model/user")

const  app = express();

app.use(express.json());
app.post("/signUp", async (req,res)=>{
    const userObj = new User(req.body);
try{
    await userObj.save();
    res.status(201).json({message:"user signed up successfully"})
}  
catch(err){
    res.status(404).json(err.message,"user signup failed !!")
}
})

app.get("/getApi", async (req,res)=>{
    const useremail = req.body.emailId;
    console.log(useremail)

    const user = await User.find({emailId:useremail})
if(user.length === 0){
    res.status(404).send("User not found");
}
{
    res.send(user)
}
    }

)

app.delete("/deleteUser/", async(req,res)=>{
    const userid = req.body._id
    console.log(userid)
    try{
       
        await User.deleteOne({_id:userid});
        console.log(userid)
        res.status(200).json({message:"user deleted successfully",userid})
        
        
    }catch(err){
        res.status(404).json(err.message,"user deletion failed !!")
    }



})

app.put("/updateUser",async (req,res)=>{
    const userid = req.body._id
    const data = req.body

    try{
        await User.updateOne({_id:userid},data)
        res.status(201).send("user updated Successfully")


    }
    catch(err){
        res.status(404).send("Error in Update",err.message )
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


