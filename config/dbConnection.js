require('dotenv').config();
const mongoose = require("mongoose")

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then((res) => {
    console.log("mongodb connected");

}).catch(err => {
    console.log("coonection failed");
    console.log(err);


})