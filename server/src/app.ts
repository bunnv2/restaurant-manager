import express from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const user = process.env.MONGO_HOST
const pass = process.env.MONGO_PASSWORD


const app = express()
const port = 8080

const uri = `mongodb+srv://${user}:${pass}@restaurant-manager.ik79ss4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1 } });
const db = client.db('restaurant-manager');

app.get('/', (req, res) => {
  const collection = db.collection('restaurants').find().toArray().then((data) => {
    console.log(data);
  });
  res.send('Hello World!')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})