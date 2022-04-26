import { GooglePlacePrediction, GooglePlacePredictionList } from "../model/GooglePlacePrediction";
import { AddDealRequest } from "../shared/AddDealRequest";
import { Deal } from "../shared/Deal";
import { Venue } from "../shared/Venue";
import { VenueDeals } from "../shared/Venue";

export class MainAPI {

    readonly baseURL = "http://localhost:3000/"

    public static readonly shared = new MainAPI() 

    async autocomplete(text: string, location?: GeolocationCoordinates): Promise<GooglePlacePredictionList> {
        let url = `${this.baseURL}venue/autocomplete?query=${text}`
        if (location) {
            url += `&lat=${location.latitude}&lng=${location.longitude}`
        }
        console.log(url)
        const response = await fetch(url);
        let parsed = await response.json()
        return parsed as GooglePlacePredictionList
    }

    async addVenue(place: GooglePlacePrediction) {
        let url = `${this.baseURL}venue/add`
        let body = {placeID: place.place_id}
        let params = {
            method: "POST", 
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, params)
        return response
    }

    async getVenues() {
        let url = `${this.baseURL}venue`
        const response = await fetch(url)
        let parsed = await response.json()
        return parsed as Venue[]
    }

    async getVenue(id: string): Promise<VenueDeals> {
        let url = `${this.baseURL}venue/${id}`
        const response = await fetch(url);
        console.log(url)
        let parsed = await response.json()
        return parsed as VenueDeals
    }

    async addDeal(body: AddDealRequest) {
        let url = `${this.baseURL}deal`
        let params = {
            method: "POST", 
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, params)
        return response.json()
    }
    
}