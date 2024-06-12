const { MongoClient } = require("mongodb");
require("dotenv").config();

const port = process.env.DB_PORT;
const host = process.env.DB_HOST;
const protocol = process.env.DB_PROTOCOL;
const dbName = process.env.DATABASENAME;

if (!host || !port || !protocol || !dbName) {
  throw new Error(
    "One or more required environment variables (DB_HOST, DB_PORT, DB_PROTOCOL, DATABASENAME) are missing or empty."
  );
}

let databaseString = `${protocol}://${host}:${port}`;

const client = new MongoClient(databaseString);

async function connect(collection) {
  try {
    const connection = await client.connect();

    const db = connection.db(dbName);

    return db.collection(collection);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);

    throw error;
  }
}

module.exports = {
  connect,
};
