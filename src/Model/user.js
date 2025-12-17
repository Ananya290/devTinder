const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    firstName : {
    type:String,
    required :true,
    minlength : 2,
    maxlength:50,
    trim:true
  },
  lastName:{
    type:String,
      required :true,
      trim:true,
  },
  emailId:{
    type:String,
      required :true,
      lowercase:true,
      unique :true,
      trim:true,
      validate(value){
       if(!validator.isEmail(value)){
        throw new Error("invalid email format")
       }  
      }
  },
  password:{
    type:String,
      required :true,
      trim:true,
      minlength : 9,
    maxlength:100,
    validate(value){
 if(!validator.isStrongPassword(value)){
  throw new Error("password is not strong enough")
 }
    }
  },
  age:{
    type:Number,
    min:1,
    max:120,
    trim:true
  },
  gender:{
    type:String,
    lowercase:true,
    validate: {
    validator: function (value) {
      return value === "male" || value === "female" || value === "other";
    },
    message: "gender must be male, female or other"
  }
},
  skills:{
    type:[]
  },
  about:{
    type:String,
    default:"this is deafult about for user",
    maxlength:250,
    trim:true
    
  },
  image:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbTu4diIJv94P-8WTWuUSn3zhn5oU5flJmQA&s",
    trim:true,
    validate(value){
      if(!validator.isURL(value)){
        throw new Error ("invalid url format for image")
      }
    }
 
  }
},
{timestamps:true}

)
userSchema.methods.getJWTToken = async function(){
  const user = this;
  const token = jwt.sign({ _id: user._id }, "DevTinder@1945",{ expiresIn: '1h' });
  return token;
}
userSchema.methods.verifyPassword = async function(password){
  const user = this;
  const hashpassword = user.password;
  const isPasswordValid = await bcrypt.compare(password, hashpassword);
  return isPasswordValid;
  
}

const User = mongoose.model("User",userSchema)

module.exports = User;