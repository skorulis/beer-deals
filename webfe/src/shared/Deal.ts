import { DayOfWeek } from "./DayOfWeek"

export enum DealStatus {
    new = "new", // Needs verification
    normal = "normal",
    expired = "expired",
    invalid = "invalid" 
}

export interface Deal {
    
    status: DealStatus
    compoundID: string
    days: DayOfWeek[]
    text: string
    link?: string
    created: Date
    timeStart: number // Minutes from 00:00
    timeEnd: number
    
}
