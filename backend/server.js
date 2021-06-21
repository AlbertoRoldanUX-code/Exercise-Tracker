//1º Require all the things we need
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//2º Configures environment variables
require('dotenv').config();

//3º Create instance
const app = express();

//4º Middleware
app.use(cors());
app.use(express.json());

//5º Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//6º Define routes
app.use('/exercises', require('./routes/exercises'));
app.use('/users', require('./routes/users'));

// get driver connection
// const dbo = require('./db/conn');

// 7º Define port
const port = process.env.PORT || 5000;

// 8º Listener
app.listen(port, () => {
  // perform a database connection when server starts
  //   dbo.connectToServer(function (err) {
  //     if (err) console.error(err);
  //   });
  console.log(`Server is running on port: ${port}`);
});
