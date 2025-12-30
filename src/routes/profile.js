const express = require("express")
const { userAuth } = require("../middleware/auth");
const { ValidateAllowedFeildData } = require("../utils/validators");

const profileAuth = express.Router();

profileAuth.get("/profile/view",userAuth, async (req, res) => {
  try {
    const user = req.user
    res.send(user)
  } catch (err) {
    res.send("Error");
  }
});

profileAuth.patch("/profile/edit",userAuth ,async (req , res)=>{
 try{
  if(!ValidateAllowedFeildData(req)){
    throw new Error("Field is not allowed to edit")
  }
  const loggedInUser = req.user;
  const updates = Object.keys(req.body);
  updates.forEach((update) => {
    loggedInUser[update] = req.body[update];
    
  });
  await loggedInUser.save();
  res.status(200).send(loggedInUser);
 } catch(err){
  res.status(400).send({ error: err.message });
 }

})

module.exports = profileAuth;