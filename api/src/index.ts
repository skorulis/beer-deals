import * as serverless from "serverless-http"
import * as express from 'express';
import * as bodyParser from "body-parser";
import { ActionReportRequest, AddReportRequest } from "./shared/AddReportRequest"
import { Request } from "express"

import { VenueDAO } from "./service/VenueDAO";
import { ReportDAO } from "./service/ReportDAO"
import { createDB } from "./util";

const app = express();
app.use(bodyParser.json({ strict: false }));

let dynamoDb = createDB()

let venueDAO = new VenueDAO(dynamoDb);
let reportDAO = new ReportDAO(dynamoDb);


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


module.exports.handler = serverless(app);