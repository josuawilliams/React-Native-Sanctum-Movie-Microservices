"use strict";
const express = require('express')
const Route = express.Router()
const movie = require("./MovieAdmin")
const client = require("./public")

Route.use("/movie", movie)
Route.use("/public", client)

module.exports = Route
