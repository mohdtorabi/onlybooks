const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['user_id'],
    overwrite: true,
  })
);

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
const bookRoutes = require('./src/routes/book');
const clubRoutes = require('./src/routes/club');
const userRoutes = require('./src/routes/user');
const sessionRoutes = require('./src/routes/session');

//use routes
app.use('/login', loginRoutes(db));
app.use('/book', bookRoutes(db));
app.use('/club', clubRoutes(db));
app.use('/user', userRoutes(db));
app.use('/session', sessionRoutes(db));

app.get('/', (req, res) => {
  res.send('test');
  // res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
