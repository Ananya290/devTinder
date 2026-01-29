const express = require('express');
const { ValidatorSignup } = require('../utils/validators')
const bcrypt = require("bcrypt");
const User = require("../Model/user");

const authRouter = express.Router();



authRouter.post("/signUp", async (req, res) => {
  try {
    ValidatorSignup(req); //validation function call ye jaruri hai don't accept invalid data
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const userObj = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await userObj.save();
    res.status(201).json({ message: "user signed up successfully" });
  } catch (err) {
    res.status(404).json(err.message, "user signup failed !!");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).json("user not found");
    }
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid credentials");
    }
    const token = await user.getJWTToken();
    res.cookie("token", token, { expires: new Date(Date.now() + 1000000000) });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Login failed: " + err.message);
  }
});
/*Setting the cookie value to null only clears its data, but the cookie may still exist in the browser.
 Expiring the cookie ensures that the browser completely removes it. Using both together guarantees a secure 
 and consistent logout across all browsers. */
authRouter.post("/logout",(req,res)=>{
  res.cookie('token',null,{ expires:new Date(Date.now()),httpOnly:true  });
  res.status(200).json({ message: "Logged out successfully" })
})

module.exports = authRouter