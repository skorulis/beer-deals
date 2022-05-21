import { sendResponse } from "../util";

module.exports.handler = async (event) => {
    return sendResponse(200, {status: "OK"})
}