const express = require('express')
const movie = express.Router()
const Controller = require("../controller/controller")

movie.get("/movie", Controller.getDataMovie)

module.exports = movie
