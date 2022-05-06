import { sendResponse } from "../util";

module.exports.handler = async (event) => {
    console.log("HSHSHSHSHHSH")
    let auth = event.requestContext.authorizer.claims
    return sendResponse(200, {profile: "Here", event})

}