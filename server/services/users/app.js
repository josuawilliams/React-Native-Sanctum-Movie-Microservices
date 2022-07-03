if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 4001
const route = require("./route/index")
const errorHandler = require("./middleware/handleError")
const {connection} = require("./config/mongodbconnection")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(route)
app.use(errorHandler)

connection().then(async () => {
    console.log("connected to MONGODB");
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})

