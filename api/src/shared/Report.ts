export enum ReportStatus {
    new = "new",
    ignored = "ignored",
    agreed = "agreed"
}

export interface Report {
    placeID: string
    userID: string
    dealID: string
    reportID: string
    reason: string
    reportStatus: ReportStatus
}


