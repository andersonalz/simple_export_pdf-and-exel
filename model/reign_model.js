const mongoose = require ("mongoose")
const { Schema } = mongoose;


const ReignSchema = new mongoose.Schema({

    reignName : {
        type : String,
        required : true,       
    }
})  

const Reign = new mongoose.model("reign", ReignSchema)

module.exports = Reign