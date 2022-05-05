import { sendResponse } from "./util";

module.exports.handler = async (event) => {
    console.log("HSHSHSHSHHSH")
    return sendResponse(200, {profile: "Here", event})

}