import { DayOfWeek } from "../DayOfWeek";
import { DealFeature } from "./DealFeature"

export interface AddDealRequest {
    placeID: string
    days: DayOfWeek[]
    features: DealFeature[]
    text: string
    link?: string
    timeStart: number // Minutes from 00:00
    timeEnd: number
    
}