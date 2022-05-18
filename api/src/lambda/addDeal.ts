import { sendResponse, createDB } from "../util";
import { UserDAO } from "../service/UserDAO"
import { VenueDAO } from "../service/VenueDAO"
import { AddDealRequest } from "../shared/deal/AddDealRequest"
import { Deal } from "../shared/deal/Deal";

let dynamoDb = createDB()
let userDAO = new UserDAO(dynamoDb);
let venueDAO = new VenueDAO(dynamoDb);

module.exports.handler = async (event) => {
    const body = JSON.parse(event.body) as AddDealRequest
    try {
        let venue = await venueDAO.loadFullVenue(body.placeID);
        let match = matching(venue.deals, body)
        if (match) {
            return sendResponse(200, match);
        }

        let result = await venueDAO.addDeal(body.placeID, body.days, body.text, body.timeStart, body.timeEnd, body.link);
        return sendResponse(200, result);
    } catch(e) {
        console.log(e);
        return sendResponse(400, {status: "ERROR", e})
    }
}

function matching(deals: Deal[], req: AddDealRequest): Deal | undefined {
    for(let d of deals) {
        if (d.text !== req.text) {
            continue;
        }
        if (arraysEqual(d.days, req.days)) {
            return d
        }
    }

    return undefined
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }