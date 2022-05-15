import { Deal } from "./Deal"

export interface Venue {
    placeID: string
    address: string
    compoundID: string
    imageURL?: string
    name: string
    lat: number
    lng: number
    suburb?: string
}

export interface VenueDeals {
    venue: Venue
    deals: Deal[]
}