import * as serverless from "serverless-http"
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as crypto from "crypto"
import { GoogleAPI } from "./service/GoogleAPI";

import { AddVenueRequest } from "./shared/AddVenueRequest" 
import { AddDealRequest } from "./shared/AddDealRequest"
import { Request } from "express"

import * as AWS from "aws-sdk"
import { Venue } from "./shared/Venue";
import { VenueDAO } from "./service/VenueDAO";

let api = new GoogleAPI();

const VENUES_TABLE = process.env.VENUES_TABLE;
const USERS_TABLE = process.env.USERS_TABLE;
const DEALS_TABLE = process.env.DEALS_TABLE;
const IS_OFFLINE = process.env.IS_OFFLINE;

const app = express();
app.use(bodyParser.json({ strict: false }));

let dynamoDb;
if (IS_OFFLINE === 'true') {
    dynamoDb = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
      secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    })
  } else {
    dynamoDb = new AWS.DynamoDB.DocumentClient();
  };

let venueDAO = new VenueDAO(dynamoDb);

app.get('/', function (req, res) {
    res.json({status: "OK"})
})

app.get('/venue/autocomplete', async function (req, res) {
    
    let q = req.query["query"] as string
    let result = await api.autocomplete(q);
  
    res.status(200).json(result);
  });

app.post('/venue/add', async function (req, res) {
  let b: AddVenueRequest = req.body;
  let details = await api.details(b.placeID);

  let venue: Venue = {
    placeID: details.place_id,
    compoundID: `VENUE#${details.place_id}`,
    address: details.formatted_address,
    name: details.name,
    lat: details.geometry.location.lat,
    lng: details.geometry.location.lng,
  }

  const params = {
    TableName: VENUES_TABLE,
    Item: venue
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create venue' });
    } else {
      res.json(details);
    }
  });
});

app.get('/venue', async function (req, res) {
  const params = {
    TableName: VENUES_TABLE
  }

  dynamoDb.scan(params, (error, result) => {
    console.log(error);
    res.json(result.Items);
  });

});

function getDeals(places: string[]) {
  const params = {
    TableName: DEALS_TABLE,
    Key: {
      //placeID: req.params.id,
    }
  }

  dynamoDb.get(params)
}

app.get('/venue/:id', async function (req: Request<{id: string}>, res) {
  try {
    let result = await venueDAO.loadFullVenue(req.params.id);
    res.json(result);
  } catch(e) {
    console.log(e);
    res.status(400).json({status: "ERROR", e});
  }
});



app.post("/deal", async function (req, res) {
  let b: AddDealRequest = req.body;
  try {
    let result = await venueDAO.addDeal(b.placeID, b.deal);
    res.json(result)
  } catch(e) {
    console.log(e);
    res.status(400).json({status: "ERROR", e});
  }
});

module.exports.handler = serverless(app);

/* Uncomment to test as a standard server
const port = 3100;
app.listen(port, () => {
  console.log(`Listening on  ${port}.`);
});
*/