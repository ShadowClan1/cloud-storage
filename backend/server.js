const express = require('express')
const CONFIG = require('./config/config')
const app = express()

const fs = require('fs')
require('dotenv').config()
app.use(express.static('/public'))
app.use(require('cors')())
app.use(express.json({limit : '50mb'}))
app.use(require('morgan')('dev'))
app.get("/", (req, res)=>res.send("Hare krishna") )
app.post('/upload', async (req, res)=>{

    // const base64Data = file.replace(/^data:image\/png;base64,/, "");
    // fs.writeFileSync("./public/test.jpg",base64Data, 'base64')
    console.log(req.body)
    console.log(req.files)
    console.log(req.file)
    // JSON.stringify(JSON.parse(req))
    res.status(200).json(req)
})


app.listen(CONFIG.PORT,()=>{
console.log(`-> ${CONFIG.PORT}`)
})