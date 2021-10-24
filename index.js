const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = 5000;

app.get('/', (req, res) => {

    res.send('Running my CRUD server')
})

// middleware
app.use(cors());
app.use(express.json());

// user and pass
// learning-database
// n4Jecc0URZJL35YK



const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://learning-database:n4Jecc0URZJL35YK@cluster0.icikx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("learningSadi");
        const products = database.collection("sadiUser");
        //get
        app.get('/products', async (req, res) => {
            console.log('hitting database');
            const cursor = products.find({})
            const product = await cursor.toArray();
            res.send(product)
        })
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id
            console.log('hitting data base');
            const query = { _id: ObjectId(id) }
            const result = await products.findOne(query);
            res.send(result);
        })

        // post 
        app.post('/products', async (req, res) => {
            const newUser = req.body;
            const result = await products.insertOne(newUser);
            res.json(result)
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);







app.listen(port, () => {
    console.log('Running Server on post ', port);
})