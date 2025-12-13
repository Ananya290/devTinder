const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName : {
    type:String,
    required :true,
    unique:true,
    minlength : 2,
    maxlength:20
  },
  lastName:{
    type:String,
      required :true,
  },
  emailId:{
    type:String,
      required :true,
      lowercase:true,
      unique :true,
  },
  password:{
    type:String,
      required :true,
      minlength : 9,
    maxlength:50
  },
  age:{
    type:Number,
    min:1,
    max:120
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
    
  },
  image:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbTu4diIJv94P-8WTWuUSn3zhn5oU5flJmQA&s"
 
  }
},
{timestamps:true}

)

const User = mongoose.model("User",userSchema)

module.exports = User;