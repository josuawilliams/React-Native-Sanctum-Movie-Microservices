const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://josuawilliams:joewils12@cluster0.tavyn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db;
 async function connection() {
        try { 
            await client.connect()
            db = client.db("challenge2-phase3")
        } catch (error) {
            console.log(error, "not connetion to database")
        }
    }

 function getDataDb() {
     return db
 }   
module.exports = {connection, getDataDb}