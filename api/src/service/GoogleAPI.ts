import axios from 'axios';
import { GooglePlaceDetails, GooglePlaceDetailsResponse} from "../model/GooglePlaceDetails"


const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export class GoogleAPI {

    readonly baseURL = "https://maps.googleapis.com/maps/api/";

    async autocomplete(text: string, lat?: string, lng?: string): Promise<GooglePlaceDetails> {
        let types = "bar|cafe|meal_takeaway|restaurant|"
        let url = `${this.baseURL}place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${text}&types=${types}&components=country:au`;
        if (lat && lng) {
            url += `&location=${lat}%2C${lng}`
        }
        console.log(url)
        const { data, status } = await axios.get(url);
        return data;
    }

    async details(placeID: string): Promise<GooglePlaceDetails> {
        let url = `${this.baseURL}place/details/json?key=${GOOGLE_API_KEY}&place_id=${placeID}`;
        console.log(url)
        const { data, status } = await axios.get<GooglePlaceDetailsResponse>(url)
        return data.result
    }

    async getPhoto(photoID: string): Promise<ArrayBuffer> {
        let url = `${this.baseURL}place/photo?key=${GOOGLE_API_KEY}&photo_reference=${photoID}&maxheight=640`
        console.log(url)
        const { data, status } = await axios.get<ArrayBuffer>(url, {responseType: 'arraybuffer'})
        console.log(typeof data)
        //const buffer = Buffer.from(data, 'binary')
        //console.log("GOT PHOTO")
        //console.log(data.byteLength)
        return data
    }

    
}