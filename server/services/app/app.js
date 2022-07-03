"use strict";
if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4002
const Route = require("./route/index")
const errorHandle = require("./middleware/HandleError")

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(Route)
app.use(errorHandle)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})