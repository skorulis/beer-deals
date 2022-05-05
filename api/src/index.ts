import * as serverless from "serverless-http"
import * as express from 'express';
import * as bodyParser from "body-parser";
import { GoogleAPI } from "./service/GoogleAPI";

import { AddVenueRequest } from "./shared/AddVenueRequest" 
import { AddDealRequest } from "./shared/AddDealRequest"
import { ActionReportRequest, AddReportRequest } from "./shared/AddReportRequest"
import { Request } from "express"

import * as AWS from "aws-sdk"
import { Venue } from "./shared/Venue";
import { VenueDAO } from "./service/VenueDAO";
import { ReportDAO } from "./service/ReportDAO"
import { RegisterRequest } from "./shared/AuthRequests";

let api = new GoogleAPI();
const cognito = new AWS.CognitoIdentityServiceProvider()

const VENUES_TABLE = process.env.VENUES_TABLE;
const IS_OFFLINE = process.env.IS_OFFLINE;
const USER_POOL_ID = process.env.USER_POOL_ID;

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
let reportDAO = new ReportDAO(dynamoDb);

app.get('/', function (req, res) {
    res.json({status: "OK"})
})

app.get('/venue/autocomplete', async function (req, res) {
    
    let q = req.query["query"] as string
    let lat = req.query["lat"] as string
    let lng = req.query["lng"] as string
    console.log(req.query)
    let result = await api.autocomplete(q, lat, lng);
  
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
  try {
    let result = await venueDAO.homeVenues()
    res.json(result);
  } catch(e) {
    console.log(e);
    res.status(400).json({status: "ERROR", e});
  }
  
});

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
    let result = await venueDAO.addDeal(b.placeID, b.days, b.text, b.timeStart, b.timeEnd, b.link);
    res.json(result)
  } catch(e) {
    console.log(e);
    res.status(400).json({status: "ERROR", e});
  }
});

app.get("/report", async function (req, res) {
  try {
    let result = await reportDAO.openReports()
    res.json(result)
  } catch(e) {
    console.log(e);
    res.status(400).json({status: "ERROR", e});
  }

});

app.post("/report", async function (req, res) {
  let r: AddReportRequest = req.body
  try {
    let result = await reportDAO.add(r.placeID, "ADMIN", r.dealID, r.reason)
    res.json(result)
  } catch(e) {
    console.log(e);
    res.status(400).json({status: "ERROR", e});
  }
});

app.post("/report/action", async function (req, res) {
  let r: ActionReportRequest = req.body
  try {
    let result = await reportDAO.set(r.reportID, r.status);
    res.json(result)
  } catch(e) {
    console.log(e);
    res.status(400).json({status: "ERROR", e});
  }
});

app.post("/auth/register", async function (req: Request<RegisterRequest>, res) {
  const params: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest = {
    UserPoolId: USER_POOL_ID!,
    Username: req.body.email,
    UserAttributes: [{
      Name: 'email',
      Value: req.body.email
    },
    {
      Name: 'email_verified',
      Value: 'true'
    }
  ],
  MessageAction: 'SUPPRESS'
  }
  const response = await cognito.adminCreateUser(params).promise();
  if (!response.User) {
    res.status(400).json({status: "ERROR", message: "Could not create user"});
    return 
  }

  const paramsForSetPass = {
    Password: req.body.password,
    UserPoolId: USER_POOL_ID!,
    Username: req.body.email,
    Permanent: true
  };
  await cognito.adminSetUserPassword(paramsForSetPass).promise()

  res.json({status: "OK", message: `Created user ${req.body.email}`})
});

module.exports.handler = serverless(app);

/* Uncomment to test as a standard server
const port = 3100;
app.listen(port, () => {
  console.log(`Listening on  ${port}.`);
});
*/