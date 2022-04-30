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
    // worksheet.columns = [
    //   { header: 'Name', key: 'name' },
    //   { header: 'Age', key: 'age' },
    //   { header: 'gender', key: 'gender' },
    //   { header: 'address', key: 'address'}
    // ]
    address.forEach(element => {
      const rowValues = []
      // worksheet.addTable({
      //   name: 'MyTable',
      //   ref: 'A1',
      //   headerRow: true,
      //   totalsRow: true,
      //   style: {
      //     theme: 'TableStyleDark3',
      //     showRowStripes: true,
      //   },
      //   columns: [
      //       { header: 'Name', key: 'name' },
      //       { header: 'Age', key: 'age' },
      //       { header: 'gender', key: 'gender' },
      //       { header: 'address', key: 'address'}
      //     ],
      //   rows: [
      //     [element.uaerAddress.name]
      //   ],
      // });
        // rowValues.push(element.userAddress.name,element.userAddress.age,element.userAddress.gender,element.address)
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
    workbook.xlsx.writeFile('data'+ Date.now() +'.xlsx')
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