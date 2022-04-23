import { DayOfWeek } from "./DayOfWeek"

export interface Deal {
    
    days: DayOfWeek[]
    text: string
    link?: string
    timeStart: number // Minutes from 00:00
    timeEnd: number
    
}