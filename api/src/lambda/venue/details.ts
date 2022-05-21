import { createDB, sendResponse } from "../../util";
import { VenueDAO } from "../../service/VenueDAO";
import { APIGatewayEvent } from 'aws-lambda';

let venueDAO = new VenueDAO(createDB());

// Get the details for a venue
module.exports.handler = async (event: APIGatewayEvent) => {
    if (!event.pathParameters) {
        return sendResponse(400, {status: "ERROR", error: "Missing path"})
    }
    try {
        let id = event.pathParameters["id"]
        let result = await venueDAO.loadFullVenue(id!);
        return sendResponse(200, result)
    } catch(e) {
        console.log(e);
        return sendResponse(400, {status: "ERROR", e})
    }
}