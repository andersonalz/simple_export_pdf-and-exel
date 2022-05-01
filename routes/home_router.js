var express = require('express');
const User = require('../model/User_model');
const mongoose = require('mongoose');
const { validation, checkUniqName} = require ('../middleware/createUser_middleware')
const router = express.Router()




router.get('/',async function(req, res) {
  try {
    const userFind = await User.find()
    const userFindCreateAt = await User.find()
    console.log(userFindCreateAt);
    res.render('information_airline',{ user : userFind})
  }catch(err) {
    res.send(err)
  }
  
});

module.exports = router;