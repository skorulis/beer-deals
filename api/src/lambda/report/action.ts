import { createDB, sendResponse } from "../../util";
import { ReportDAO } from "../../service/ReportDAO"
import { ActionReportRequest } from "../../shared/AddReportRequest"

let reportDAO = new ReportDAO(createDB());

module.exports.handler = async (event) => {
    const body = JSON.parse(event.body) as ActionReportRequest
    try {
        let result = await reportDAO.set(body.reportID, body.status);
        return sendResponse(200, result)
    } catch(e) {
        console.log(e);
        return sendResponse(400, {status: "ERROR", e})
    }
}