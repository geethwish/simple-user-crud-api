// modules
const express = require('express')
const dotenv = require('dotenv').config();
const colors = require('colors');
var cors = require('cors');
const ConnectDB = require('./config/db');


// routes import
const clientsRoute = require('./routes/clientsRoute');

// middleware
const { errorHandler } = require('./middleware/errorMiddleware');

// set server port
const port = process.env.PORT || 8050;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/uploads', express.static('uploads'))

// use error handler middleware
app.use(errorHandler);

// routes
app.use('/api/clients', clientsRoute);

// connect to database
ConnectDB();

// start server
app.listen(port, () => console.log(`Server starting on port ${port}`))