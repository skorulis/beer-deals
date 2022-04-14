import { Venue } from "./Venue";
import { DayOfWeek } from "./DayOfWeek";

export interface Deal {
    
    days: DayOfWeek[]
    text: string
    link?: string
    timeStart: number // Minutes from 00:00
    timeEnd: number
    
}

export interface VenueDeals {
    venue: Venue
    deals: Deal[]
}

export enum DealType {
    DRINKS,
    FOOD
}

export enum DrinksType {
    BEER = "beer",
    WINE = "wine",
    SPIRITS = "spirits",
    COCKTAILS = "cocktails"
}

export enum FoodType {
    PIZZA,
    STEAK,
    BURGER,
    DUMPLING,
    WINGS,
    ROAST
}