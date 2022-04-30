const mongoose = require ("mongoose")
const { Schema } = mongoose;


const CitySchema = new mongoose.Schema({

    cityName : {
        type : String,
        required : true,
        trim : true,        
    },
    countryCity:
    {
        type : Schema.Types.ObjectId,
        ref : 'Country',
    }
})  

const City = new mongoose.model("City", CitySchema)

module.exports = City