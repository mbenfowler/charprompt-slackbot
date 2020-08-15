'use strict';
const path = require('path');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const randomChar = require('./randomChar');

const router = express.Router();
router.get('/', (req, res) => {
  res.json(randomChar())
});

app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', router);

module.exports = app;
module.exports.handler = serverless(app);