import { GooglePlacePrediction, GooglePlacePredictionList } from "../model/GooglePlacePrediction";
import { GooglePlaceDetails } from "../shared/GooglePlaceDetails";

export class MainAPI {

    readonly baseURL = "http://localhost:3000/"

    public static readonly shared = new MainAPI() 

    async autocomplete(text: string): Promise<GooglePlacePredictionList> {
        let url = `${this.baseURL}venue/autocomplete?query=${text}`
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
        return parsed as GooglePlaceDetails[]
    }

    async getVenue(id: string) {
        let url = `${this.baseURL}venue/${id}`
        const response = await fetch(url);
        console.log(url)
        let parsed = await response.json()
        return parsed as GooglePlaceDetails
    }
    
}