require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const DB = 'mongodb+srv://insharefilesharingapp:ZbOojrqkd3lo0OHD@yelpcamp.4pqv2.mongodb.net/inshare?retryWrites=true&w=majority';

mongoose.connect(DB, { useNewUrlParser: true }, { useUnifiedTopology: true }).then(() => {
  console.log(`connection successfull`);
})

// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

app.use(cors(corsOptions))
app.use(express.static('public'));

app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(process.env.PORT || 3000, console.log(`Listening on port ${PORT}.`));