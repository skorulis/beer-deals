const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
//const api = require("./service/GoogleAPI");
//import Secrets from './model/Secrets';
 
const USERS_TABLE = process.env.USERS_TABLE;
const IS_OFFLINE = process.env.IS_OFFLINE;

let baseURL = "https://maps.googleapis.com/maps/api/";

async function autocomplete(text) {
  let url = `${this.baseURL}place/autocomplete/json?key=${Secrets.googleAPIKey}&input=${text}`
  const response = await fetch(url);
  return response.json();
}

let dynamoDb;
if (IS_OFFLINE === 'true') {
    dynamoDb = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
      secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    })
    console.log(dynamoDb);
  } else {
    dynamoDb = new AWS.DynamoDB.DocumentClient();
  };
 
app.use(bodyParser.json({ strict: false }));
 
app.get('/', function (req, res) {
  res.send('Hello World OLD')
})
 
// Get User endpoint
app.get('/users/:userId', function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }
 
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }
    if (result.Item) {
      const {userId, name} = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
})
 
// Create User endpoint
app.post('/users', function (req, res) {
  const { userId, name } = req.body;
  console.log("POSTING USER " + userId)
  console.log("------")
  if (typeof userId !== 'string') {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }
 
  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };
 
  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.json({ userId, name });
  });
})

app.get('/venue/autocomplete', async function (req, res) {
  //let x = await autocomplete("Rose of Australia");
  //console.log(x);

  res.status(200).json({ message: "Something" });
});
 
module.exports.handler = serverless(app);