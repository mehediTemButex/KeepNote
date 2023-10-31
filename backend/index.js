const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3a3kg1v.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // await client.connect();

        const database = client.db("noteDB").collection("note");

        app.get("/", (req, res) => {
            res.send("hello")
        });


        app.get("/notes/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { id: id };
            const cursor = database.find(filter);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get("/update/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await database.findOne(filter);
            res.send(result);
        })

        app.post("/notes", async (req, res) => {
            const data = req.body;
            const result = await database.insertOne(data);
            res.send(result);
        })

        app.put("/notes/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateData = {
                $set: {
                    text: data.text,
                    formattedDate: data.formattedDate
                },
            };
            const result = await database.updateOne(query, updateData, options);
            res.send(result);
        })

        app.delete("/notes/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await database.deleteOne(query)
            res.send(result)
        })

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

        // await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`app is running at port ${port}`);
})