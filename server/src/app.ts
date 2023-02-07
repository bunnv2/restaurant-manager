import { MongoClient, ServerApiVersion } from 'mongodb';
import { Restaurant } from './schemas/modules';
import express from 'express'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser = require('body-parser');

dotenv.config();
const user = process.env.MONGO_HOST
const pass = process.env.MONGO_PASSWORD


const app = express()
const port = 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

    const user = await Restaurant.findOne({ name });
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

    res.set('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: 'Logged in successfully' }).end();
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.get('/protected', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'Error logging in' });
    }

    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(200).json({ message: 'Protected route' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});