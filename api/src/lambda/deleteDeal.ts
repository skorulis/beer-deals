import { sendResponse, createDB } from "../util";
import { ProfileModel } from "../shared/ProfileModel"
import { extractAuth } from "../middleware/authMiddleware"
import { UserDAO } from "../service/UserDAO"
import { VenueDAO } from "../service/VenueDAO"
import { DeleteDealRequest } from "../shared/deal/DeleteDealRequest";

let dynamoDb = createDB()
let userDAO = new UserDAO(dynamoDb);
let venueDAO = new VenueDAO(dynamoDb);

module.exports.handler = async (event) => {
    const body = JSON.parse(event.body) as DeleteDealRequest
    try {
        await venueDAO.deleteDeal(body.placeID, body.dealID)
        
        return sendResponse(200, {status: "OK"})
    } catch(e) {
        console.log(e);
        return sendResponse(400, {status: "ERROR", e})
    }
    
}