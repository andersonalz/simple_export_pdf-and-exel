const mongoose = require("mongoose")
const { Schema } = mongoose;



const UserSchema =new mongoose.Schema({
    name : {
       type : String,  
       unique: true,
       required: true,
       trim : true,
       minlength: 3,
       maxlength: 50
    },
    age :{
        type : Number,
    } ,
    gender : {
        type : String,
        enum : ['male', 'female'],
        default : "male"
    },
},{
    timestamps : true
}) 



const User = mongoose.model('User', UserSchema)
module.exports = User

