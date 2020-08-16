'use strict';
const path = require('path');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const randomChar = require('./randomCharacter');

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    "text": randomChar()
  });
});
router.post('/', (req, res) =>  res.json({
    "delete_original": "true",
    "response_type": "in_channel",
    "text": randomChar()
  }));

app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);