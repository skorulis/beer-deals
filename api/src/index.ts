import * as serverless from "serverless-http"
import * as express from 'express';
import * as bodyParser from "body-parser";
import { GoogleAPI } from "./service/GoogleAPI";

import { AddDealRequest } from "./shared/AddDealRequest"
import { ActionReportRequest, AddReportRequest } from "./shared/AddReportRequest"
import { Request } from "express"

import { VenueDAO } from "./service/VenueDAO";
import { ReportDAO } from "./service/ReportDAO"
import { createDB } from "./util";

let api = new GoogleAPI();

const app = express();
app.use(bodyParser.json({ strict: false }));

let dynamoDb = createDB()

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

app.get("/test/:photoID", async function (req: Request<{photoID: string}>, res: express.Response) {
  try {
    let output = await api.getPhoto(req.params.photoID)
    console.log(output.byteLength)
    res.setHeader('Content-Type', "image/jpeg")
    res.write(output)
    res.send()
  } catch(e) {
    res.status(400).json({status: "ERROR", e});
  }
});

module.exports.handler = serverless(app);