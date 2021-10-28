const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ultz5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("travelDb");
      const servicesCollection = database.collection("services");

      // POST API

      const doc = {
        name: "Cox's Bazar",
        description: "Cox's Bazar is the world longest Sea Beach in the world" ,
      }
      const result = await servicesCollection.insertOne(doc);
      console.log(result);

    }
    finally {
     // await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('Running my CRUD Server')
});

app.listen(port, () => {
    console.log('Running Server on port', port);
})