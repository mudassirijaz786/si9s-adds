const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const testingAPI = require("./routes/api/testingAPI");
const driver = require("./routes/api/driver");
const customer = require("./routes/api/customer");
const area = require("./routes/api/area");
const compaign = require("./routes/api/compaign");
const video = require("./routes/api/video");
const payment = require("./routes/api/payment");

var busboyBodyParser = require("busboy-body-parser");
var bodyParser = require("body-parser");

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();
app.use(busboyBodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/api/testingAPI", testingAPI);
app.use("/api/driver", driver);
app.use("/api/customer", customer);
app.use("/api/area", area);
app.use("/api/compaign", compaign);
app.use("/api/video", video);
app.use("/api/payment", payment);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
