import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors'
import 'dotenv/config'
const app = express();
const PORT = 8000;
app.use(cors())
app.use(express.json())

// This code is from Mongodb
const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const mongoClient = await connectToMongoDB()
const db = mongoClient.db("product-curd");
const productCollection = db.collection("products")

// http://localhost:8000/products
app.post('/products', async(req, res) => {
    const data = req.body
    const result = await productCollection.insertOne(data)
    console.log(result);
    res.send(result)
})

app.get('/products', async(req, res) => {
    const result = await productCollection.find().toArray()
    res.send(result)
})


app.get('/products/:id', async (req, res) => {
  const {id} = req.params
  const result = await productCollection.findOne({_id: new ObjectId(id)})
  res.send({result})
})


app.patch('/products/:id', async(req, res) => {
  const data = req.body
  const {id} = req.params
  const result = await productCollection.updateOne(
    {_id: new ObjectId(id)}, 
    {$set: data}
  )
  res.send(result)
})


app.delete('/products/:id', async(req, res) => {
  const {id} = req.params
  const result = await productCollection.deleteOne({_id: new ObjectId(id)})
  res.json(result)
})


// to get something on http://localhost:8000/
app.get('/', (req, res) => {
    // res.send('Server is running!')
    res.send({msg: 'server is running!'})
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})