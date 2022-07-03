const express = require('express')
const route = express.Router()
const Controller = require("../controller/controller")

route.get("/user", Controller.getDataUser)
route.post("/user", Controller.createUser)

route.get("/user/:id", Controller.getDataUserById)

route.delete("/user/:id", Controller.deletedUser)
route.put("/user/:id", Controller.updateUser)
module.exports = route