const mongoose = require("mongoose")

const userScheme=new mongoose.Schema({
    _id :mongoose.Schema.ObjectId,
    name:String,
    email:String,
    age: Number
},
{ collection: "userInfo", versionKey: false }
)
const userModal = mongoose.model("userInfo",userScheme)


module.exports=userModal;