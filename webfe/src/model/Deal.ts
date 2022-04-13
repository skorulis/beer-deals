import { Venue } from "./Venue";
import { DayOfWeek } from "./DayOfWeek";

export interface Deal {
    
    days: DayOfWeek[]
    text: string
    link?: string
    timeStart: number
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
    BEER,
    WINE,
    SPIRITS,
    COCKTAIL
}

export enum FoodType {
    PIZZA,
    STEAK,
    BURGER,
    DUMPLING,
    WINGS,
    ROAST
}