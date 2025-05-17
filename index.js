require('dotenv').config()
const express = require("express")
const crose = require("cors")
require('./config/dbConnection')
const router = require('./routes/router')

const crmappServer = express()
crmappServer.use(crose())
crmappServer.use(express.json())
crmappServer.use(router)
crmappServer.use('/uploads', express.static('uploads'));


const PORT = 3000 || process.env.PORT
crmappServer.listen(PORT, () => {
    console.log(`crmappServer running at${PORT}`);

})
crmappServer.get("/", (req, res) => {
    res.status(200).send(`<h1>crmappServer started </h1>`)
})