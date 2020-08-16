'use strict';
const path = require('path');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const randomChar = require('./randomCharacter');

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    "response_type": "ephemeral",
    "text": randomChar()
  });
});
router.post('/', (req, res) =>  {
    const user = req.query.user_name
    res.json({
    "response_type": "ephemeral",
    
    "blocks": [
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": `:crystal_ball: ${user} summoned me!`,
					"emoji": true
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": randomChar(),
			}
		}
	]
  })});

app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);