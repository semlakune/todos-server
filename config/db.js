const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);
let dbConnect

async function connect() {
    try {
        const database = client.db("todos");
        dbConnect = database
    } catch (err) {
        await client.close();
        console.log(err);
    }
}

const getDb = () => {
    return dbConnect
}

module.exports = {
    connect,
    getDb
};
