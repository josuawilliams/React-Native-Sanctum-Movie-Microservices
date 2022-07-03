if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}
const port = process.env.PORT || 4000
const { ApolloServer } = require('apollo-server');
const Movies = require("./Schema/MovieSchema")
const User = require("./Schema/UserSchema")


const server = new ApolloServer({
    typeDefs: [Movies.typeDefs, User.typeDefs],
    resolvers: [Movies.resolvers, User.resolvers],
    csrfPrevention: true
})



server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
});