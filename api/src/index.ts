import * as serverless from "serverless-http"
import * as express from 'express';
import * as bodyParser from "body-parser";
import { Request } from "express"

import { VenueDAO } from "./service/VenueDAO";
import { createDB } from "./util";

const app = express();
app.use(bodyParser.json({ strict: false }));

let dynamoDb = createDB()

let venueDAO = new VenueDAO(dynamoDb);

app.get('/venue/:id', async function (req: Request<{id: string}>, res) {
  try {
    let result = await venueDAO.loadFullVenue(req.params.id);
    res.json(result);
  } catch(e) {
    console.log(e);
    res.status(400).json({status: "ERROR", e});
  }
});

module.exports.handler = serverless(app);