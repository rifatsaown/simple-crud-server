const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const data = require('./data.json');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rifatsaown0:1EEBuxdvFmw0m4PN@cluster0.meus3dj.mongodb.net/?retryWrites=true&w=majority";

//rifatsaown0
//1EEBuxdvFmw0m4PN

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('CRUD server is running')
})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

 
app.listen(port, () => { 
    console.log(`App Running on port ${port}!`) 
})