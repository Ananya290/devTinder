const mongoose = require('mongoose');
const User = require('./user');

const UserConnectionSchema = new mongoose.Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true

    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
         require:true
    },
    status:{
        type:String,
         require:true,
        enum:{
           values: ["ignored","interested","accepted","rejected"],
           massage:`{VALUES} is incorrect in status Type`
        }
    }
},
{
    timestamps:true
});

UserConnectionSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });
UserConnectionSchema.pre('save', async function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()) {
        throw new Error("fromUserId and toUserId cannot be the same");
    }   
    next();
}); 
const connectionRequestModel = new mongoose.model("UserConnectionSchema",UserConnectionSchema)

module.exports = connectionRequestModel;