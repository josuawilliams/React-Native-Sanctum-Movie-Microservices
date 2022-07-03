"use strict";
const {User} = require("../models/index")
const {readToken} = require("../helper/jwt")

async function authenticationAdmin(req, res, next) {
    try {
        const access_token = req.headers.access_token
        const read = readToken(access_token)
        const compare = await User.findOne({
            where: {
                email: read.email,
                id: read.id
            }
        })
        if(!compare) {
            throw ({name: "User Not Found"})
        }
        req.Addition = {
            role : compare.role,
            id : compare.id,
            username : compare.username
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    authenticationAdmin
}