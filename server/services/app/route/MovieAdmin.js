"use strict";
const express = require('express')
const movie = express.Router()
const Controller = require("../controller/controller")

movie.post("/login", Controller.Login)
movie.post("/register",Controller.registerAdmin)
// movie.use(authenticationAdmin)

movie.get("/", Controller.Dashboard)
movie.post("/", Controller.CreateMovie)
movie.get("/genre", Controller.Genre)
movie.get("/detail/:id", Controller.DetailMovie)

movie.get("/:id", Controller.getMoviebyId)
movie.put("/update/:id", Controller.UpdateMovie)
movie.delete("/delete/:id",Controller.deleteMovie)
module.exports = movie