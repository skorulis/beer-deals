import axios from 'axios';
import { GooglePlaceDetails, GooglePlaceDetailsResponse} from "../model/GooglePlaceDetails"


const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export class GoogleAPI {

    readonly baseURL = "https://maps.googleapis.com/maps/api/";

    async autocomplete(text: string, lat?: string, lng?: string): Promise<any> {
        let types = "bar|cafe|meal_takeaway|restaurant|"
        let url = `${this.baseURL}place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${text}&types=${types}&components=country:au`;
        if (lat && lng) {
            url += `&location=${lat}%2C${lng}`
        }
        console.log(url)
        const { data, status } = await axios.get(url);
        console.log(data)
        return data;
    }

    async details(placeID: string): Promise<GooglePlaceDetails> {
        let url = `${this.baseURL}place/details/json?key=${GOOGLE_API_KEY}&place_id=${placeID}`;
        const { data, status } = await axios.get<GooglePlaceDetailsResponse>(url)
        return data.result
    }

    
}