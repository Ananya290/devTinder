const mongoose = require('mongoose')

const UserConnectionSchema = new mongoose.UserConnectionSchema.Schema({

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
    timestamp:true
});

const connectionRequest = new mongoose.model("UserConnectionSchema",UserConnectionSchema)

module.exports = connectionRequest;