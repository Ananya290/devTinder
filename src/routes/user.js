const express = require("express");
const UserRouter = express.Router();
const connectionRequestModel = require("../Model/connectionRequests");
const { userAuth } = require("../middleware/auth");



UserRouter.get("/user/request/recieved", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
    
        const connectionRequest = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: { $in: ["interested"] }
        }).populate('fromUserId', 'firstName lastName email');

        res.status(200).json({
            connectionRequest
        })
    }
    catch(err){
        res.status(400).json({
            massages:"ERROR :" + err.message
        })
    }
}
)

module.exports = UserRouter;
