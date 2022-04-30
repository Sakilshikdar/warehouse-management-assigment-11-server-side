const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb")
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fsloq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
const run = async () => {
    try {
        await client.connect();
        const productCollection = client.db('wearHouse2').collection('product')
        app.get('/product', async(req, res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    catch (error) {
        console.log(error);
    }
}
run()

app.listen(port, () => {
    console.log('Listening to port', port)
})