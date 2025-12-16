const jwt = require("jsonwebtoken");
const User = require("../Model/user")


const userAuth = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
    if(!token){
        throw new Error("Invalid token")
    }
    const jwtDecoded = await jwt.verify(token,"DevTinder@1945")
    const { _id }  = jwtDecoded;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("User Not Found!!!")
    }
    
    req.user = user
    next();



    }
    catch(err){
        res.status(400).send("Error", err.message);
    }



}







module.exports={
    userAuth
}