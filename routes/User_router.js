var express = require('express');
const User = require('../model/User_model');
const mongoose = require('mongoose');
const { validation, checkUniqName} = require ('../middleware/createUser_middleware')
const router = express.Router()




router.get('/findUser',async function(req, res) {
  try{
    let data = await User.find({});
    res.send(data);
  } 
  catch(err){
    res.send(err);
  }
});

router.post("/createUser", async (req,res)=>{
  try{
    const Create_User = await User.create({
      name : req.body.name,
      age : req.body.age,
      gender : req.body.gender,
      address : req.body.address
    })
    res.send(Create_User);
  }
  catch(err){
    res.send(err);
  }
});

router.put("/updateUser", async (req,res)=>{
  try{
    let data = await User.updateOne(req.body);
    res.send(data);
  }
  catch(err){
    res.send(err);
  }
});

router.delete("/deleteUser", async function(req,res){
  try{
    const Create_User = await User.create({
      name : req.body.name,
      age : req.body.age,
      gender : req.body.gender
    })
    res.send(data);
  }
  catch(err){
    res.send(err);
  }
});



module.exports = router;


