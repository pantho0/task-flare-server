const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// taskflareMe
// y85zypjxtcOdyRxd

// middlewares
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://taskflareMe:y85zypjxtcOdyRxd@cluster0.guubgk2.mongodb.net/?retryWrites=true&w=majority";


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
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const taskCollection = client.db("tasksDB").collection("tasks")

    // for adding task
    app.post('/tasks', async(req,res)=>{
        const tasks = req.body;
        const result = await taskCollection.insertOne(tasks)
        res.send(result)

    })

    // for get individual task 
    app.get('/viewTask', async(req,res)=>{
        let query = {}
        if(req.query.email){
            query = { email: req.query?.email };
        }
        const result = await taskCollection.find(query).toArray();
        res.send(result); 
    })

    // for update own task 

    app.get("/update/:id", async (req, res) => {
        try {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const result = await taskCollection.findOne(query);
          res.send(result);
        } catch (error) {
          console.log(error);
        }
      });






  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req,res)=>{
    res.send("Todo-Ph is running")
})

app.listen(port, ()=>{
    console.log("Todo-PH running on port ", port);
})