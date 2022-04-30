const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require("./db/connection.db");


const Home = require('./routes/home_router');
const User = require('./routes/User_router');
const Address = require('./routes/Address_router');
const exportExcel = require('./routes/export_excel_router');
const exportPdf = require('./routes/export_pdf_router');
const RCC = require('./routes/RCC_router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Home);
app.use('/User', User);
app.use('/Address', Address);
app.use('/exportExcel', exportExcel);
app.use('/exportPdf', exportPdf);
app.use('/rcc', RCC);

app.use((_req, _res, next) => { next(createError(404)); });
app.use((err, req, res, _next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 404);
    res.json({ path: "authentication", success: false, result: { error: "Path does not exist" } });
    console.log(res.locals.message)
});

// uncaught Exception handler
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING DOWN NOW!!");

    console.log(err.message, err.name);
    process.exit(1);
});

module.exports = app;
