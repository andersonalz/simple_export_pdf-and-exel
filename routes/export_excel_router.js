const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const User = require('../model/User_model');
const Address = require('../model/Address_model');
const fs = require('fs').promises;


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
      worksheet.addRow(element);
      console.log(element);
      user.forEach(element => {
        worksheet.addRow(element);
        console.log(element);
      });
    });
    workbook.xlsx.writeFile('data.xlsx')
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
    //   const readFileFs  = await fs.readFile(__dirname + one.xlsx);
    //   const workbook = new Excel.Workbook();
    //   const readFile = await workbook.xlsx.readFile(__dirname + one.xlsx)

    //   console.log(readFileFs)
    //   fs.readFile(readFile, function (err, data) {    // file is read 
    //         if (err) { console.log(err); }
    //         res.send(data);
    //         console.log(data);
    //     });
    //     console.log(readFile);
    //     res.send("ok");
    //   } catch (err) { 
    //       res.send(err);
    //   }
//   });

module.exports = router;