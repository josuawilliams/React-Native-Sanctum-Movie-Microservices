"use strict";
const { Movie } = require("../models/index")

async function authorizationAdmin(req, res, next) {
    try {
        const { role } = req.Addition
        if (role !== "admin") {
            throw ({ name: "Staff Not Allowed" })
        }
        next()
    } catch (error) {
        next(error)
    }
}

async function authorizationDelete(req, res, next) {
    try {
        const { id, role } = req.Addition
        const Movieid = req.params.id
        if (role === "admin") {
            return next()
        }
        const data = await Movie.findOne({
            where: {
                id: Movieid
            }
        })
        if (!data) {
            throw ({ name: "Movie Not Found" })
        }
        if (role === "staff") {
            if (data.UserId !== id) {
                throw ({ name: "Not Allowed To Delete This" })
            }
        }
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    authorizationAdmin,
    authorizationDelete
}