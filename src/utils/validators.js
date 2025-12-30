const emailvalidator = require("email-validator");
const validator = require("validator");


const ValidatorSignup = (req)=>{
   const {firstName,lastName,emailId,password}=req.body;
   if(!firstName || !lastName || !emailId || !password){
    throw new Error("Feilds cannot be empty");
}
else if(firstName.length < 2 || firstName.length > 30 || lastName.length < 2 || lastName.length > 30){
    throw new Error("Name length must be between 2 and 30 characters");
}
else if(!emailvalidator.validate(emailId)){
    throw new Error("Invalid email format");
}
else if(!validator.isStrongPassword(password,{
    minLength:8,
    minLowercase:1, 
    minUppercase:1,
    minNumbers:1,
    minSymbols:1
})){
    throw new Error("Password is too weak");
}
}

const ValidateAllowedFeildData = (req)=>{
    const allowedFeilds = ["firstName","lastName","age","gender","skills","about"];

    const isEditAllowed = Object.keys(req.body).every((field)=>
    allowedFeilds.includes(field));

    return isEditAllowed;
}
module.exports={
    ValidatorSignup,
    ValidateAllowedFeildData
}