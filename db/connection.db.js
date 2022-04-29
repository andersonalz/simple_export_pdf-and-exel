// Module dependencies.
const mongoose = require("mongoose");
// require config file
const { db } = require('../config/config')
//connection string for mongoose
const connectionString = db;

main().catch(err => console.log(err));
async function main() {
    // conecting mongo database
    await mongoose.connect(connectionString)
        .catch(err => {
            if (err) {
                console.log(err); process.exit(1);
            }
        });
}

// give connection to variable
const dbase = mongoose.connection;

// database on error event
dbase.on('error', console.error.bind(console, 'MongoDB connection error:'));

// database on conect event
dbase.on('connected', () => console.log('MongoDB connected'));

// database on disconnected event
dbase.on('disconnected', () => mongoose.connect(connectionString)
    .catch(err => {
        if (err) {
            console.log(err); process.exit(1);
        }
    }));

module.exports = db;
