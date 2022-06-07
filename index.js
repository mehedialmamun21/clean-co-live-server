const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

const uri = "mongodb+srv://cleanCoUser:i3YKJ5JgJAPgfyZ3@cluster0.orkw8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const servicesCollection = client.db('cleanCo').collection('service');

        app.get('/service', async (req, res) => {
            const services = await servicesCollection.find({}).toArray();
            console.log(services);
            res.send(services);
        });

    } finally {

    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send("Hello");
})

app.listen(port, () => {
    console.log(`port = ${port}`);
});