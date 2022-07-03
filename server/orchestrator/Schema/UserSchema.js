const { gql } = require('apollo-server');
const axios = require('axios');
const BASE_URL_USER = "https://sanctum-service-user.herokuapp.com/"
const dataRedis = require("../connection/configRedis")

const typeDefs = gql`
    type User {
        id : ID
        username : String
        email : String
        role : String
        phoneNumber : String
        address : String
    }

    input UserInput {
        username : String
        email : String
        role : String
        password : String
        phoneNumber : String
        address : String
    }

    type Query {
        getUser : [User]
    }

    type Mutation{
        CreateUser(NewUser : UserInput) : message
        deletedUser(id : ID!) : message
        UpdateUser(id : ID!, data : UserInput) : message
    }
`

const resolvers = {
    Query: {
        getUser: async () => {
            try {
                const dataRedisUser = await dataRedis.get("Users")
                if (dataRedisUser) {
                    const dataUser = JSON.parse(dataRedisUser)
                    return dataUser
                } else {
                    const data = await axios({
                        method: "GET",
                        url: BASE_URL_USER + "user"
                    })
                    await dataRedis.set("Users", JSON.stringify(data.data))
                    return data.data
                }
            } catch (error) {
                return error.response.data
            }

        }
    },
    Mutation: {
        CreateUser: async (parent, args) => {
            try {
                const { username, email, role, password, phoneNumber, address } = args.NewUser
                const data = await axios({
                    method: "POST",
                    url: BASE_URL_USER + "user",
                    data: {
                        username,
                        email,
                        role,
                        password,
                        phoneNumber,
                        address
                    }
                })
                return data.data
            } catch (err) {
                return err.response.data
            }
        },
        deletedUser: async (parent, args) => {
            try {
                const { id } = args
                const data = await axios({
                    method: "DELETE",
                    url: BASE_URL_USER + `user/${id}`
                })
                await dataRedis.del("Users")
                return data.data
            } catch (error) {
                return error.response.data
            }
        },
        UpdateUser: async (parent, args) => {
            try {
                const { id } = args
                const { username, email, role, phoneNumber, address } = args.data
                const data = await axios({
                    method: "PUT",
                    url: BASE_URL_USER + `user/${id}`,
                    data: {
                        username,
                        email,
                        role,
                        phoneNumber,
                        address
                    }
                })
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