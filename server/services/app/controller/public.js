const {Movie , Cast , Genre , User } = require('../models')

class Controller {
    static async publicDashboard(req, res, next){
        try {
            const movies = await Movie.findAll({
                include: [Genre]
            })
            res.status(200).json(movies)
        } catch (error) {
            next(error)
        }
    }
    static async DetailMovie(req, res, next) {
        try {
            const slug = req.query.slug
            const getData = await Movie.findOne({
                where: {
                    slug
                },
                include: [Genre, Cast]
            })
            res.status(200).json(getData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller