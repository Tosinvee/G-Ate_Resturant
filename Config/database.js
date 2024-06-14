const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

const client = new MongoClient(uri);

async function connect(collection) {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    const db = client.db();
    return db.collection(collection);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = {
  connect,
};
