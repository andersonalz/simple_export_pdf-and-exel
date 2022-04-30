const express = require('express');
var pdfmake = require('pdfmake');
const router = express.Router();
const User = require('../model/User_model');
const Address = require('../model/Address_model');
const fs = require('fs').promises;
const path = require('path');

router.get('/getPdf', async (req, res) => {

    try {
        var fonts = {
            Roboto: {
                normal: path.join(__dirname, '..', 'public', '/fonts/Roboto-Regular.ttf'),
                bold: path.join(__dirname, '..', 'public', '/fonts/Roboto-Medium.ttf'),
                italics: path.join(__dirname, '..', 'public', '/fonts/Roboto-Italic.ttf'),
                bolditalics: path.join(__dirname, '..', 'public', '/fonts/Roboto-MediumItalic.ttf')
            }
        };
        const address = await Address.find({}).populate('userAddress').exec();
        let a = [[{
            text: 'Name',
            
        }, {
            text: 'Age',
           
        }, {
            text: 'Gender',
            
        },{
            text: 'address',
            
        }] , ]
        for (let i = 0; i < address.length; i++) {
            a.push([address[i].userAddress.name, 
              address[i].userAddress.age ,
              address[i].userAddress.gender,address[i].address])
        }
        let listTableDocs = {
            content: [],
            styles: {}
        }
        console.log(a)
        let table = {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 3,
            widths: ['*', 'auto', 100, 60],

            body : a
        }

        listTableDocs['content'].push({
            text: "TEST",
            style: 'subheader'
        }, {
            table: table
        })
        pdfmake.addFonts(fonts);
        const pdf = pdfmake.createPdf(listTableDocs);

        // Writing it to disk
        pdf.write('document' + Date.now() + ".pdf").then(() => {
            // success event
            res.send("Success");
        }, err => {
            // error event
            console.error(err);
        });
    } catch (err) {
        res.send(err);
    }
}
);



router.get('/userGetPdf/:id', async (req, res) => {

    try {
        var fonts = {
            Roboto: {
                normal: path.join(__dirname, '..', 'public', '/fonts/Roboto-Regular.ttf'),
                bold: path.join(__dirname, '..', 'public', '/fonts/Roboto-Medium.ttf'),
                italics: path.join(__dirname, '..', 'public', '/fonts/Roboto-Italic.ttf'),
                bolditalics: path.join(__dirname, '..', 'public', '/fonts/Roboto-MediumItalic.ttf')
            }
        };
        const address = await Address.find({userAddress : req.params.id}).populate({
            path: 'userAddress',
            options: { limit: 3 }})
        let a = [[{
            text: 'Name',
            
        }, {
            text: 'Age',
           
        }, {
            text: 'Gender',
            
        },{
            text: 'address',
            
        }] , ]
        for (let i = 0; i < address.length; i++) {
            a.push([address[i].userAddress.name, 
              address[i].userAddress.age ,
              address[i].userAddress.gender,address[i].address])
        }
        let listTableDocs = {
            content: [],
            styles: {}
        }
        console.log(a)
        let table = {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 3,
            widths: ['*', 'auto', 100, 60],

            body : a
        }

        listTableDocs['content'].push({
            text: "TEST",
            style: 'subheader'
        }, {
            table: table
        })
        pdfmake.addFonts(fonts);
        const pdf = pdfmake.createPdf(listTableDocs);

        // Writing it to disk
        pdf.write('document' + Date.now() + ".pdf").then(() => {
            // success event
            res.send("Success");
        }, err => {
            // error event
            console.error(err);
        });
    } catch (err) {
        res.send(err);
    }
}
);

module.exports = router;