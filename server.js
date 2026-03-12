
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database('hotel.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    roomType TEXT,
    checkin TEXT,
    checkout TEXT,
    phone TEXT
  )`);
});

app.post('/register', (req,res)=>{
  const {name,email,password} = req.body;
  db.run("INSERT INTO users(name,email,password) VALUES(?,?,?)",
  [name,email,password], function(err){
    if(err) return res.status(500).send(err);
    res.send({message:"Registered Successfully"});
  });
});

app.post('/book', (req,res)=>{
  const {name,roomType,checkin,checkout,phone} = req.body;
  db.run("INSERT INTO bookings(name,roomType,checkin,checkout,phone) VALUES(?,?,?,?,?)",
  [name,roomType,checkin,checkout,phone], function(err){
    if(err) return res.status(500).send(err);

    const whatsappMsg = `https://wa.me/${phone}?text=Your booking request for ${roomType} from ${checkin} to ${checkout} has been received.`;

    res.send({
      message:"Booking submitted",
      whatsapp: whatsappMsg
    });
  });
});

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"public/index.html"));
});

app.listen(3000, ()=> console.log("Server running on http://localhost:3000"));
