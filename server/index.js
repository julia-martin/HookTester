require('dotenv').config();
const express = require("express");
const session = require('express-session');
// const bodyParser = require('body-parser');
// const path = require('path');
const connectMongoDB = require("./config/mongodb.js");
const cors = require("cors");
const { loginController } = require('./routes/api/login');

const app = express();

// connect to mongo and pg
const db = connectMongoDB();

// init middleware
app.use(express.json({ extended: false }));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use(session({
    secret: 'waypostsecret',
    name: 'uniqueSessionID',
    saveUninitialized: false
}));

// Waypost SDK Config
app.use(async (req, res, next) => {
  const Config = require("waypost-sdk-js-server");
  const sdkClient = await new Config('67c9b0db-e839-4afb-96e2-390febd08dab', "http://localhost:5050").connect();
  if (req.session.loggedIn) {
    sdkClient.addContext({ userId: req.session.userId });
  }
  req.sdkClient = sdkClient;
  next();
});

app.get("/", (req, res) => {
  res.render('index'); // render frontpage here
});

// define routes
app.use("/api/test", require("./routes/api/test"));
app.use("/api/url", require("./routes/api/url"));
app.use("/r", require("./routes/receive_webhook"));
app.use("/inspect", require("./routes/inspect"));
app.post("/login", loginController);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});