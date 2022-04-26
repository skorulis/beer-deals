import { DayOfWeek } from "./DayOfWeek"

export interface Deal {
    
    compoundID: string
    days: DayOfWeek[]
    text: string
    link?: string
    created?: Date
    timeStart: number // Minutes from 00:00
    timeEnd: number
    
}
