import * as serverless from "serverless-http"
import * as express from 'express';
import { GoogleAPI } from "./service/GoogleAPI";

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World V3')
})

app.get('/venue/autocomplete', async function (req, res) {
    let api = new GoogleAPI();
    console.log(req)
    let q = req.query["query"]
    let result = await api.autocomplete(q);
  
    res.status(200).json(result);
  });

module.exports.handler = serverless(app);

/* Uncomment to test as a standard server
const port = 3100;
app.listen(port, () => {
  console.log(`Listening on  ${port}.`);
});
*/