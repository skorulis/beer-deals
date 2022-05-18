import { DayOfWeek } from "../DayOfWeek";

export interface AddDealRequest {
    placeID: string
    days: DayOfWeek[]
    text: string
    link?: string
    timeStart: number // Minutes from 00:00
    timeEnd: number
    
}