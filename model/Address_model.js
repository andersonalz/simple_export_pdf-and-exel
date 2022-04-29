const mongoose = require ("mongoose")
const { Schema } = mongoose;
const User = require('./User_model')

const AddressSchema = new mongoose.Schema({

    address : {
        type : String,
        required : true,
        trim : true,        
    },
    userAddress:
    {
        type : Schema.Types.ObjectId,
        ref : 'User',
    }
})  

const Address = new mongoose.model("Address", AddressSchema)
module.exports = Address