"use strict";
const { User, Movie, Genre, Cast, sequelize, Sequelize: { op } } = require("../models/index")
const { readHash } = require("../helper/HashPassword")
const { CreateToken } = require("../helper/jwt")
class Controller {
    static async Login(req, res, next) {
        try {
            const { email, password } = req.body;
            const compare = await User.findOne({
                where: {
                    email,
                }
            })
            if (!compare) {
                throw ({ name: "Username Or Password Wrong" })
            }
            if (compare.role === "customer") {
                throw ({ name: "Not Allowed" })
            }
            const Comparepassword = readHash(password, compare.password)
            if (!Comparepassword) {
                throw ({ name: "Username Or Password Wrong" })
            }
            const payload = {
                username: compare.username,
                role: compare.role,
                id: compare.id,
                email: compare.email
            }
            const access_token = CreateToken(payload)
            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }

    }
    static async registerAdmin(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const data = await User.create({
                username,
                email,
                role: "staff",
                password,
                phoneNumber,
                address
            })
            res.status(201).json({
                message: "Successfully registered And Welcome"
            })
        } catch (error) {
            next(error)
        }
    }

    static async Dashboard(req, res, next) {
        try {
            const movie = await Movie.findAll({
                include: [Genre]
            })
            res.status(200).json(movie)
        } catch (error) {
            next(error)
        }
    }

    static async DetailMovie(req, res, next) {
        try {
            const slug = req.params.id
            const getData = await Movie.findOne({
                where: {
                    id:slug
                },
                include: [Genre, Cast]
            })
            res.status(200).json(getData)
        } catch (error) {
            next(error)
        }
    }

    static async CreateMovie(req, res, next) {
        try {
            const t = await sequelize.transaction()
            const UserId = 1
            const { title, synopsis, trailerURL, imgURL, rating, GenreId, pict1, pict2, pict3, name1, name2, name3, UserMongoId } = req.body
            const createMovie = await Movie.create({
                title,
                synopsis,
                slug: title,
                trailerURL,
                imgURL,
                rating,
                GenreId,
                UserId,
                UserMongoId
            }, {
                transaction: t
            })
            const createimage = await Cast.bulkCreate([
                { MovieId: createMovie.id, name: name1, profilePict: pict1 },
                { MovieId: createMovie.id, name: name2, profilePict: pict2 },
                { MovieId: createMovie.id, name: name3, profilePict: pict3 },
            ], { transaction: t })
            await t.commit();
            res.status(201).json({
                message: "Successfully Create Movie"
            })
        } catch (error) {
            next(error)
            t.rollback()
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const id = req.params.id
            const data = await Movie.destroy({
                where: {
                    id
                }
            })
            if (!data) {
                throw ({ name: "Movie Not Found", })
            }
            res.status(200).json({
                message: "Successfully Delete Movie"
            })
        } catch (error) {
            next(error)
        }
    }

    static async UpdateMovie(req, res, next) {
        try {
            const t = await sequelize.transaction()
            const id = req.params.id
            const { title, synopsis, trailerURL, imgURL, rating, GenreId, name1, name2, name3, pict1, pict2, pict3, UserMongoId } = req.body
            const data = await Movie.update({
                title,
                synopsis,
                trailerURL,
                imgURL,
                rating,
                GenreId,
                UserId : 1,
                UserMongoId
            }, {
                where: {
                    id
                },
                individualHooks: true
            }, {
                transaction: t
            })
            if (!data) {
                throw ({ name: "Movie Not Found", })
            }
            const updateimage = await Cast.destroy({
                where: {
                    MovieId: id
                }
            }, {
                transaction: t
            })
            const createimage = await Cast.bulkCreate([
                { MovieId: id, name: name1, profilePict: pict1 },
                { MovieId: id, name: name2, profilePict: pict2 },
                { MovieId: id, name: name3, profilePict: pict3 },
            ], { transaction: t })
            await t.commit();
            res.status(200).json({
                message: "Successfully Update Movie"
            })

        } catch (error) {
            next(error)

        }
    }

    static async getMoviebyId(req, res, next) {
        try {
            const id = req.params.id
            const data = await Movie.findAll({
                where: {
                    GenreId: id
                },
                include: [Genre, Cast]
            })
            if (!data) {
                throw ({ name: "Movie Not Found", })
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async Genre(req, res, next) {
        try {
            const data = await Genre.findAll()
            res.status(200).json(data) 
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller