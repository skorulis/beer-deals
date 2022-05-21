import { createDB, sendResponse } from "../../util";
import { ReportDAO } from "../../service/ReportDAO"

let reportDAO = new ReportDAO(createDB());

module.exports.handler = async (event) => {
  try {
    let result = await reportDAO.openReports()
    return sendResponse(200, result)
  } catch(e) {
    console.log(e);
    return sendResponse(400, {status: "ERROR", e})
  }
}