"use strict"
const axios = require('axios')
const BASE_URL = 'http://localhost:4002'

class Controller {
    static async getDataMovie(req, res, next) {
        try {
            const movies = await axios({
                method : "GET",
                url : `${BASE_URL}/movie`
            })
            res.status(200).json(movies)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller