import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Receipt, Restaurant } from './schemas/modules';
import express from 'express'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { publicLogged } from './middleware/verifyToken';
import { Receipt as ReceiptType, Restaurant as RestaurantType } from './types';

dotenv.config();
const user = process.env.MONGO_HOST
const pass = process.env.MONGO_PASSWORD


const app = express()
const port = 8080

app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
  }
));
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

app.post('/add-tables', publicLogged ,async (req : any, res : any) => {
  try {
    const restaurant = await db.collection("restaurants").findOne({ _id: new ObjectId(req.user.id) });
    if (!restaurant) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const tables = req.body.tables;
    if (!tables) {
      return res.status(400).json({ error: 'Invalid tables' });
    }
    const newTables = tables.map((table : any, index: number) => {
      const existingTable = restaurant.tables && restaurant.tables.find((t : any) => t.number === table.number);
      const isOcc = existingTable ? existingTable.isOccupied : false;
      return {
        number: index + 1,
        capacity: table[index+1],
        isOccupied: isOcc,
      }
    })
    const newRestaurant = {
      ...restaurant,
      tables: newTables,
    }
    await db.collection("restaurants").updateOne({ _id: new ObjectId(req.user.id) }, { $set: newRestaurant });
    res.status(201).json({message: 'Tables modified successfully'});
  } catch (error) {
    console.log(error)
      res.status(500).json("Server error");
  }
});

app.get('/get-tables', publicLogged ,async (req : any, res : any) => {
  try {
    const restaurant = await db.collection("restaurants").findOne({ _id: new ObjectId(req.user.id) });
    if (!restaurant) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    if (!restaurant.tables) {
      db.collection("restaurants").updateOne({ _id: new ObjectId(req.user.id) }, { $set: {tables: []} });
    }
    res.status(201).json(restaurant.tables);
  } catch (error) {
    console.log(error)
    res.status(500).json("Something went wrong");
  }
} );

app.post('/add-meals', publicLogged ,async (req : any, res : any) => {
  try {
    const restaurant = await db.collection("restaurants").findOne({ _id: new ObjectId(req.user.id) });
    if (!restaurant) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const meals = req.body.meals;
    if (!meals) {
      return res.status(400).json({ error: 'Invalid meals' });
    }
    const newMeals = meals.map((meal : any) => {
      const {mealName, price, description} = meal;
      return {
        mealName,
        price,
        description,
      }
    })
    const newRestaurant = {
      ...restaurant,
      meals: newMeals,
    }
    await db.collection("restaurants").updateOne({ _id: new ObjectId(req.user.id) }, { $set: newRestaurant });
    res.status(201).json({message: 'Meals modified successfully'});
  } catch (error) {
    console.log(error)
    res.status(500).json("Something went wrong");
  }
} );

app.get('/get-meals', publicLogged ,async (req : any, res : any) => {
  try {
    const restaurant = await db.collection("restaurants").findOne({ _id: new ObjectId(req.user.id) });
    if (!restaurant) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    if (!restaurant.meals) {
      db.collection("restaurants").updateOne({ _id: new ObjectId(req.user.id) }, { $set: {meals: []} });
    }
    const meals = restaurant.meals;
    res.status(201).json(meals);
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
} );

app.get('/get-receipt', publicLogged ,async (req : any, res : any) => {
  try {
    const restaurant = await db.collection("restaurants").findOne({ _id: new ObjectId(req.user.id) });
    if (!restaurant) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    // get params
    const {table} = req.query;
    const receipt = db.collection("receipts").findOne({ tableNumber:table });
    if (!receipt) {
      return res.status(200).json({ message: 'No receipt for this table' });
    }
    res.status(201).json(receipt);
  } catch (error) {
    console.log(error)
      res.status(500).json("Something went wrong");
  }
} );

// app.post('/add-receipt', publicLogged ,async (req : any, res : any) => {
//   try {
//     const restaurant = await db.collection("restaurants").findOne({ _id: new ObjectId(req.user.id) });
//     if (!restaurant) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }
//     const receiptData : ReceiptType = req.body.receipt;
//     if (!receiptData) {
//       return res.status(400).json({ error: 'Invalid receipt' });
//     }

//     const receipt = new Receipt(receiptData);
//     res.status(201).json({message: 'Receipt added successfully'});
//   } catch (error) {
//       res.status(500).json("Something went wrong");
//   }
// }
// );