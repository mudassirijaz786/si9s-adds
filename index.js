const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const testingAPI = require('./routes/api/testingAPI');
const driver = require('./routes/api/driver')
const customer = require('./routes/api/customer')
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')

const app = express();
connectDB()
app.use(cors())
app.use(express.json());
app.use('/api/testingAPI', testingAPI);
app.use('/api/driver', driver);
app.use("/api/customer", customer)


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));