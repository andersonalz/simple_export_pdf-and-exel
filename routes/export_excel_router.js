const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const User = require('../model/User_model');
const Address = require('../model/Address_model');
const fs = require('fs').promises;
const path = require('path');


router.get('/getExcel', async (req, res) => {
  try {
    const user = await User.find({});
    const address = await Address.find({}).populate('userAddress').exec();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = [
      { header: 'Name', key: 'name' },
      { header: 'Age', key: 'age' },
      { header: 'gender', key: 'gender' },
      { header: 'address', key: 'address'}
    ]
    address.forEach(element => {
      worksheet.addRow(element.userAddress);
      console.log(element);
      // user.forEach(element => {
      //   worksheet.addRow(element);
      //   console.log(element);
      // });
    });
    workbook.xlsx.writeFile('data'+ Date.now() +'.xlsx')
        .then(() => {   // file is written
            console.log('success')
            res.send('success');
        });
    } catch (err) {
        res.send(err);
    }
});


router.get('/userGetExcel/:id', async (req, res) => {
  try {
    const user = await User.find({});
    const address = await Address.find({ userAddress : req.params.id }).populate('userAddress').limit(3);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1',{
      headerFooter:{firstHeader: "Hello Exceljs", firstFooter: "Hello World"}
    });
    worksheet.columns = [
      { header: 'Name'},
      { header: 'Age' },
      { header: 'gender'},
      { header: 'address'}
    ]
    address.forEach(element , index => {
      const rowValues = []
        // rowValues.push(element.userAddress.name,element.userAddress.age,element.userAddress.gender,element.address)
        if(rowValues[0])
        rowValues[0] = element.userAddress.name
        rowValues[1] = element.userAddress.age
        rowValues[2] = element.userAddress.gender
        rowValues[3] = element.address
        worksheet.addRow(rowValues);
      // worksheet.addRow(element.userAddress);
      // console.log(element);
      // user.forEach(element => {
      //   worksheet.addRow(element);
      //   console.log(element);
      // });
      
    });
    const dir = path.join(__dirname , "../public/export/")
    workbook.xlsx.writeFile(dir + 'data'+ Date.now() +'.xlsx')
        .then(() => {   // file is written
            console.log('success')
            res.send('success');
        });
    } catch (err) {
        res.send(err);
    }
});
// router.get('/readFile', async (req, res) => {
//     try {
    //   const workbook = new Excel.Workbook();
    // const dir = path.join(__dirname , "../public/export/")
    //   const readFile = await workbook.xlsx.readFile(dir + one.xlsx)
    //     res.send("ok");
    //   } catch (err) { 
    //       res.send(err);
    //   }
//   });

module.exports = router;