import { sendResponse } from "../../util";
import { APIGatewayEvent } from 'aws-lambda';
import { GoogleAPI } from "../../service/GoogleAPI";

let api = new GoogleAPI();

module.exports.handler = async (event: APIGatewayEvent) => {
    if (!event.queryStringParameters) {
        return sendResponse(400, {status: "Error"})
    }
    console.log(event.queryStringParameters)
    let q = event.queryStringParameters["query"] ?? ""
    let lat = event.queryStringParameters["lat"]
    let lng = event.queryStringParameters["lng"]

    let alternateResult = await api.textSearch(q, lat, lng);

    return sendResponse(200, alternateResult)
}