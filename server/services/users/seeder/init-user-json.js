const { MongoClient } = require("mongodb");
const user = require("./user.json")
const {hashPass} = require("../middleware/hashpass")
const uri = "mongodb+srv://josuawilliams:joewils12@cluster0.tavyn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const database = client.db("challenge2-phase3");
        const movies = database.collection('users');
        user.map(item => {
            item.password = hashPass(item.password)
        })
        const option = {ordered:true}
        const result = await movies.insertMany(user,option)
        console.log(result);
    } finally {
        await client.close();
    }
}
run().catch(console.error);