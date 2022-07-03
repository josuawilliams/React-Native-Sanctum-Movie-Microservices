const { gql } = require('apollo-server');
const axios = require('axios');
const dataRedis = require("../connection/configRedis")
const BASE_URL = "https://sanctum-service-app.herokuapp.com/"
const BASE_URL_USER = "https://sanctum-service-user.herokuapp.com/"


const typeDefs = gql`
    type Genres {
        id: ID,
        name: String
    }
    type Movie {
        id : ID
        title : String
        synopsis : String
        trailerURL : String
        imgURL : String
        rating : Int
        UserId : Int
        GenreId : Int
        UserMongoId : String
        Genre: Genres
        Casts : [Casts]
        Author : User
    }

    type message {
        message : String
    }
    
    type Casts {
        id : ID
        MovieId : Int
        name : String
        profilePict : String
    }

    input MovieInput {
        title : String
        sysnopsis : String
        trailerURL : String
        imgURL : String
        rating : Int
        genreId : Int
        UserMongoId : String,
        name1 : String,
        name2 : String,
        name3 : String,
        pict1 : String,
        pict2 : String,
        pict3 : String
    }
    type Query {
        getMovies : [Movie]
        getMovieDetail(id : ID!) : Movie
        getGenre : [Genres]
        showGenre(id : ID!) : [Movie]
    }

    type Mutation {
        addMovie(
            title : String
            synopsis : String
            trailerURL : String
            imgURL : String
            rating : Int
            GenreId : Int
            UserMongoId : String 
            pict1 : String
            pict2 : String
            pict3 : String
            name1 : String
            name2 : String
            name3 : String
        ): message
        deleteMovie(id : ID!) : message
        UpdateMovie(id: ID, NewUpdate : MovieInput) : message
    }
`


const resolvers = {
    Query: {
        getMovies: async () => {
            try {
                const dataRedisProduct = await dataRedis.get("product")
                if (dataRedisProduct) {
                    const dataMovie = JSON.parse(dataRedisProduct)
                    return dataMovie
                } else {
                    const data = await axios({
                        method: 'GET',
                        url: BASE_URL + "movie",
                    })
                    await dataRedis.set("product", JSON.stringify(data.data))
                    return data.data
                }
            } catch (error) {
                return error.response.data

            }
        },

        getMovieDetail: async (parent, args) => {
            try {
                const { id } = args
                const dataDetail = await axios({
                    method: 'GET',
                    url: BASE_URL + `movie/detail/${id}`,
                })
                const dataUser = await axios({
                    method: 'GET',
                    url: BASE_URL_USER + `user/${dataDetail.data.UserMongoId}`,
                })
                const data = dataDetail.data
                return {
                    Author: dataUser.data,
                    ...data
                }
            } catch (error) {
                return error.response.data
            }
        },
        getGenre: async () => {
            try {
                const data = await axios({
                    method: 'GET',
                    url: BASE_URL + "movie/genre",
                })
                return data.data
            } catch (error) {
                return error.response.data
               
            }
        },
        showGenre: async (parent, args) => {
            try {
                const { id } = args
                const data = await axios({
                    method: 'GET',
                    url: BASE_URL + `movie/${id}`,
                })
                return data.data
            } catch (error) {
                return error.response.data

            }
        }

    },
    Mutation: {
        addMovie: async (parent, args) => {
            try {
                const { title, synopsis, trailerURL, imgURL, rating, GenreId, UserMongoId, pict1, pict2, pict3, name1, name2, name3 } = args
                const data = await axios({
                    method: 'POST',
                    url: BASE_URL + "movie",
                    data: {
                        title,
                        synopsis,
                        trailerURL,
                        imgURL,
                        rating,
                        GenreId,
                        UserMongoId,
                        pict1,
                        pict2,
                        pict3,
                        name1,
                        name2,
                        name3
                    }
                })
                await dataRedis.del("product")
                return data.data
            } catch (error) {
                return error.response.data

            }
        },
        deleteMovie: async (parent, args) => {
            try {
                const { id } = args
                const data = await axios({
                    method: 'DELETE',
                    url: BASE_URL + `movie/delete/${id}`,
                })
                await dataRedis.del("product")
                return data.data
            } catch (error) {
                return error.response.data
            }
        },
        UpdateMovie: async (parent, args) => {
            try {
                const { id } = args
                const { title, synopsis, trailerURL, imgURL, rating, GenreId, UserMongoId, pict1, pict2, pict3, name1, name2, name3 } = args.NewUpdate
                const data = await axios({
                    method: 'PUT',
                    url: BASE_URL + `movie/update/${id}`,
                    data: {
                        title,
                        synopsis,
                        trailerURL,
                        imgURL,
                        rating,
                        GenreId,
                        UserMongoId,
                        pict1,
                        pict2,
                        pict3,
                        name1,
                        name2,
                        name3
                    }
                })
                await dataRedis.del("product")
                return data.data
            } catch (error) {
                return error.response.data

            }
        }
    }
}


module.exports = {
    typeDefs,
    resolvers
}