import { GooglePlacePredictionList } from "../model/GooglePlacePrediction";

export class MainAPI {

    readonly baseURL = "http://localhost:3000/"

    async autocomplete(text: string): Promise<GooglePlacePredictionList> {
        let url = `${this.baseURL}venue/autocomplete?query=${text}`
        console.log(url)
        const response = await fetch(url);
        let parsed = await response.json()
        return parsed as GooglePlacePredictionList
    }
    
}