var express = require('express');
const User = require('../model/User_model');
const mongoose = require('mongoose');
const { validation, checkUniqName } = require('../middleware/createUser_middleware')
const router = express.Router()

router.post("/createReign", async (req, res) => {
    try {
        const Create_User = await User.create({
            ReignName: req.body.reignName
        })
        res.send(Create_User);
    }
    catch (err) {
        res.send(err);
    }
});

router.post("/createCountry", async (req, res) => {
    try {
        const Create_User = await User.create({
            countryName: req.body.countryName
        })
        res.send(Create_User);
    }
    catch (err) {
        res.send(err);
    }
});

router.post("/createCity", async (req, res) => {
    try {
        const Create_User = await User.create({
            cityName: req.body.cityName
        })
        res.send(Create_User);
    }
    catch (err) {
        res.send(err);
    }
});

module.exports = router