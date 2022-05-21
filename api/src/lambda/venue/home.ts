import { createDB, sendResponse } from "../../util";
import { VenueDAO } from "../../service/VenueDAO";

let venueDAO = new VenueDAO(createDB());

// Venues to display on the home page
module.exports.handler = async (event) => {
    try {
        let result = await venueDAO.homeVenues()
        return sendResponse(200, result)
    } catch(e) {
        console.log(e);
        return sendResponse(400, {status: "ERROR", e})
    }
}