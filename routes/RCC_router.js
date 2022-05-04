var express = require('express');
const Reign =require('../model/reign_model')
const Country = require("../model/country_model")
const City = require("../model/city_model")
const mongoose = require('mongoose');
const router = express.Router()

router.post("/createReign", async (req, res) => {
    try {
        const Create_Reign = await Reign.create({
            reignName: req.body.reignName
        })
        res.send(Create_Reign);
    }
    catch (err) {
        res.send(err);
    }
});

router.post("/createCountry", async (req, res) => {
    try {
        const Create_Country = await Country.create({
            countryName: req.body.countryName,
            reignOfCountries : req.body.reignOfCountries
        })
        res.send(Create_Country);
    }
    catch (err) {
        res.send(err);
    }
});

router.post("/createCity", async (req, res) => {
    try {
        const Create_City = await City.create({
            cityName: req.body.cityName,
            countryOfCities : req.body.countryOfCities

        })
        res.send(Create_City);
    }
    catch (err) {
        res.send(err);
    }
});



router.get("/getReignFromCity/:name" , async (req , res)=>{
    const oneCity = await Reign.aggregate([
        { $match: { reignName: req.params.name } },
        {
            $lookup: {
                from: Country.collection.name,
                localField: "_id",
                foreignField: "reignOfCountries",
                as: "countries",
                pipeline: [
                    {
                        $lookup: {
                            from: City.collection.name,
                            localField: "_id",
                            foreignField: "countryOfCities",
                            as: "cities"
                        }
                    }
                ]
            },
        },
    ]).exec();
    // const oneCity = await City.find({cityName : req.params.name}).populate( "countryOfCities")
    // const onecountry =  await Country.find({countryName :oneCity[0].countryOfCities.countryName }).populate("reignOfCountries")
    // console.log(onecountry);
    // res.send("ok");
    console.log(oneCity);
    res.send(oneCity);
})



router.get("/allCityCountry/:name" , async (req , res)=>{
    const allCityCountry = await Country.aggregate([
        {
            $match: { countryName: req.params.name }
        },
        { 
            $lookup: {
                from: City.collection.name,
                localField: "_id",
                foreignField: "countryOfCities",
                as: "cities"
        }
    },
    { $unwind: "$cities" },
    {
        $project: {
          "_id": 0,
          "reignOfCountries": 0,
          "countryOfCities": 0,
          "__v": 0,
          "cityName": "$cities.cityName",
      }
    }
    ]).exec();
    console.log(allCityCountry);
    res.send(allCityCountry);
}) 
 

router.get("/getAllCityFromCountry/:name" , async (req , res)=>{
    const oneCity = await City.find({cityName : req.params.name}).populate( "countryOfCities")
    const oneCountry =  await Country.find({countryName :oneCity[0].countryOfCities.countryName }).populate("reignOfCountries")
    console.log(oneCity);
    res.send(oneCity);
})
router.get('/countCity' , async (req , res)=>{
    const count = await City.aggregate([
        {
            $group: {
                _id: "A",
                count: { $sum: 1 }
            }
        }
    ]).exec()
    console.log(count);
    res.send("ok");
})


module.exports = router

