const express = require('express')
const client = express.Router()
const Controller = require("../controller/public")


client.get("/", Controller.publicDashboard)
client.get("/detail", Controller.DetailMovie)


module.exports = client