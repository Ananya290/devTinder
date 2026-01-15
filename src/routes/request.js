const express = require('express')
const { userAuth } = require("../middleware/auth")
const connectionRequests = require("../Model/connectionRequests")
const User = require("../Model/user")

const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=>{
  try{
const fromUserId = req.user._id;
const toUserId = req.params.toUserId;
const status = req.params.status;

const allowedStatus = ["ignored","interested"]
if(!allowedStatus.includes(status)){
  return res.status(400).json({error:"Invalid status value"})
}

const toUser = await User.findById(toUserId);
if(!toUser){
  return res.status(404).json({error:"User not found"})
}

const existingRequest = await connectionRequests.findOne({ 
  $or:[
    {fromUserId, toUserId},
    {fromUserId:toUserId, toUserId:fromUserId}
  ]
 });
if (existingRequest) {
  return res.status(400).json({ error: "Connection request already sent to this user." });
}

const connectionRequest = new connectionRequests({
  fromUserId,
  toUserId,
  status
})
const data = await connectionRequest.save()

res.json(
 {
   massage: req.user.firstName + " " + "has" + status + " " + toUser.firstName,
   data
 }

)

  }catch(err){
    res.status(500).json({error:err.message})
  }

}
)

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res)=>{
  try{
    const loggedInUserId = req.user._id;
 const { status, requestId } = req.params;

   const allowedUser = ["accepted","rejected"]
   if(!allowedUser.includes(status)){
    return res.status(400).json({error:"Invalid status value"})
   }
   const commectionRequest = await connectionRequests.findOne({
    _id:requestId,
    toUserId:loggedInUserId,
    status:"interested"
   });
   if(!commectionRequest){
    return res.status(404).json({error:"Connection request not found"})
   }

   commectionRequest.status = status;
  const data =  await commectionRequest.save();
    res.json(
      {
        message: "Request has been" + " " + status,
        data
      }
    )

  }catch(err){
    res.status(500).json({error:err.message})
  }
}
 )

module.exports = requestRouter;