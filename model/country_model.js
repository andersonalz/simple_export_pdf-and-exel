const mongoose = require ("mongoose")
const { Schema } = mongoose;


const CountrySchema = new mongoose.Schema({

    countryName : {
        type : String,
        required : true,
        trim : true,        
    },
    reignCountry:
    {
        type : Schema.Types.ObjectId,
        ref : 'reign',
    }
})  

const Country = new mongoose.model("Country", CountrySchema)

module.exports = Country