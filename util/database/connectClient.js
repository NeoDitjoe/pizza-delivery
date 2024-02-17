const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DATABASE;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default client
