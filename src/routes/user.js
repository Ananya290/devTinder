const express = require("express");
const UserRouter = express.Router();
const connectionRequestModel = require("../Model/connectionRequests");
const { userAuth } = require("../middleware/auth");

const USER_SAFE_FIELDS = ['firstName', 'lastName' , 'emailId'];

UserRouter.get("/user/request/recieved", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
    
        const connectionRequest = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: { $in: ["interested"] }
        }).populate('fromUserId',USER_SAFE_FIELDS );

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
UserRouter.get("/user/connection", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
    
        const connectionRequest = await connectionRequestModel.find({
           $or:[
            { toUserId: loggedInUser._id, status: "accepted" },
            { fromUserId: loggedInUser._id, status: "accepted" }
           ]
        }).populate('fromUserId', USER_SAFE_FIELDS ).populate('toUserId', USER_SAFE_FIELDS );

        const data = connectionRequest.map((request)=>{
            if(request.fromUserId._id.toString()=== loggedInUser._id.toString()){
                return request.toUserId
            }
            return request.fromUserId
        })

        res.status(200).json({
            data
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
