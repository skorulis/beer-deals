import { ReportStatus } from "./Report"


export interface AddReportRequest {
    placeID: string
    dealID: string
    reason: string
}

export interface ActionReportRequest {
    reportID: string
    status: ReportStatus
}