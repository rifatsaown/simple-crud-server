const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const userCollection = client.db("usersDB").collection("users");

    app.get('/users', async (req, res) => {
      const cursor = userCollection.find();
      const users = await cursor.toArray();
      res.send(users);
    });
    app.get('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('hitting the post', user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.put('/user/:id', async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
      console.log('hitting the put', result);
    })


    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  finally { }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`App Running on port ${port}!`)
})