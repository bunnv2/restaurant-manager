import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Restaurant } from './schemas/modules';
import express from 'express'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { publicLogged } from './middleware/verifyToken';

dotenv.config();
const user = process.env.MONGO_HOST
const pass = process.env.MONGO_PASSWORD


const app = express()
const port = 8080

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const uri = `mongodb+srv://${user}:${pass}@restaurant-manager.ik79ss4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1 } });
const db = client.db('restaurant-manager');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/register', async (req, res) => {
  try {
    const {name,password,address,city,foodType,phone} = await req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const restaurantData = {
      name,
      password: hashedPassword,
      address,
      city,
      foodType,
      phone,
    }
    const restaurant = new Restaurant({...restaurantData});
    await restaurant.validate()
    db.collection('restaurants').insertOne(restaurantData)

    res.status(201).json({message: 'Restaurant created successfully'});
  } catch (error : any) {
    res.status(500).json({message: error.message});
  }
})

app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await db.collection("restaurants").findOne({ name });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'Error logging in' });
    }

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: '1d'
    });

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: true,
    })
    .sendStatus(200);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

app.get('/add-tables', publicLogged ,async (req : any, res : any) => {
  const restaurant = await db.collection("restaurants").findOne({ _id: new ObjectId(req.user.id) });
  try {
    console.log('hello ',restaurant)
    res.send('add tables')
  } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
  }
});