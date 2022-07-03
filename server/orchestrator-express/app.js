require("dotenv").config()
const express = require('express')
const cors = require('cors')
const port = process.env.PORT
const errorHandle = require("./middleware/handdleError")
const movie = require('./route/movie')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(movie)
app.use(errorHandle)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})