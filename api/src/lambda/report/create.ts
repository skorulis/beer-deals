import { createDB, sendResponse } from "../../util";
import { ReportDAO } from "../../service/ReportDAO"
import { AddReportRequest } from "../../shared/AddReportRequest"

let reportDAO = new ReportDAO(createDB());

module.exports.handler = async (event) => {
    const body = JSON.parse(event.body) as AddReportRequest
    try {
        let result = await reportDAO.add(body.placeID, "ADMIN", body.dealID, body.reason)
        return sendResponse(200, result)
    } catch(e) {
        console.log(e);
        return sendResponse(400, {status: "ERROR", e})
    }
}