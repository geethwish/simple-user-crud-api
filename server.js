// modules
const express = require('express')
const dotenv = require('dotenv').config();
const colors = require('colors');
var cors = require('cors');
const ConnectDB = require('./config/db');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc")

// routes import
const clientsRoute = require('./routes/clientsRoute');

// middleware
const { errorHandler } = require('./middleware/errorMiddleware');


// set server port
const port = process.env.PORT || 8050;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Simple CURD Api",
            version: "1.0.0",
            description: "Simple curd operations for manage Client details"
        },
        servers: [
            {
                url: "http://localhost:8050"
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
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