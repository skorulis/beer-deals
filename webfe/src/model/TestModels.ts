import { Deal, VenueDeals } from "./Deal";
import { DealList } from "./DealList";
import { Venue } from "./Venue";


export function dealList1(): DealList {
    return {
        deals: [venueDeals1()]
    }
} 

export function venueDeals1(): VenueDeals {
    return {
        venue: venue1(),
        deals: [deal1()]
    }
}

function venue1(): Venue {
    return {
        name: "Rose",
        lat: 1,
        lng: 1,
        suburb: "Erskineville"
    }
}

function deal1(): Deal {
    return {
        days: [],
        text: "Here is a deal",
        timeStart: 100,
        timeEnd: 200
    }
}