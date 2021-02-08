const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//import process.env settings
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const { Client } = require('pg');

const db = new Client({
  connectionString: process.env.DATABASE_URL,
});

// use this if you want to use local db or db without
// database_url string
// const db = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

db.connect();

//import routes
const loginRoutes = require('./src/routes/login');

//use routes
app.use('/login', loginRoutes(db));

app.get('/', (req, res) => {
  res.send('test');
  // res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
