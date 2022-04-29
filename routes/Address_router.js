var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Address = require('../model/Address_model');


router.get('/findAddress',async function(req, res) {
  try{
    const data = await Address.find({}).populate('userAddress').exec();
    res.send(data);
  } 
  catch(err){
    res.send(err);
  }
});

router.post("/createAddress", async (req,res)=>{
  try{
    const Create_Address = await Address.create({
      address : req.body.address,
      userAddress:req.body.userAddress
    })
    res.send(Create_Address);
  }
  catch(err){
    res.send(err);
  }
});

module.exports = router;
