export enum ReportStatus {
    new = "new",
    ignored = "ignored",
    agreed = "agreed"
}

export interface ReportEntry {
    userID: string
    reportID: string
    reason: string
    status: ReportStatus
}

export interface Report {
    placeID: string
    entries: ReportEntry[]
}


