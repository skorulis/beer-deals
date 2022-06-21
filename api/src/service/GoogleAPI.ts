import axios from 'axios';
import { GooglePlaceDetails, GooglePlaceDetailsResponse} from "../model/GooglePlaceDetails"
import { VenueAutocomplete, VenueAutocompleteList } from '../shared/venue/VenueAutocomplete';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export class GoogleAPI {

    readonly baseURL = "https://maps.googleapis.com/maps/api/";
    readonly types = "bakery|bar|cafe|meal_delivery|meal_takeaway|night_club|restaurant"

    async autocomplete(text: string, lat?: string, lng?: string): Promise<VenueAutocompleteList> {
        let url = `${this.baseURL}place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${text}&types=${this.types}&components=country:au`;
        if (lat && lng) {
            url += `&location=${lat}%2C${lng}`
        }
        console.log(url)
        const { data, status } = await axios.get(url);
        console.log(data)
        return data;
    }

    async findPlace(text: string, lat?: string, lng?: string): Promise<VenueAutocompleteList> {
        let fields = "fields=name,place_id"
        let url = `${this.baseURL}place/findplacefromtext/json?key=${GOOGLE_API_KEY}&input=${text}&inputtype=textquery&${fields}`
        if (lat && lng) {
            url += `&locationbias=circle:50000@${lat},${lng}`
        }
        console.log(url)
        const { data, status } = await axios.get(url);
        let items: VenueAutocomplete[] = data.candidates.map(x => {
            return {
                description: x.name,
                place_id: x.place_id
            }
        })
        return {
            predictions: items
        }
    }

    async textSearch(text: string, lat?: string, lng?: string): Promise<VenueAutocompleteList> {
        let url = `${this.baseURL}place/textsearch/json?key=${GOOGLE_API_KEY}&query=${text}`
        if (lat && lng) {
            url += `&location=${lat}%2C${lng}`
        }
        console.log("HELLO")
        console.log(url)
        const { data, status } = await axios.get(url);
        console.log(data)
        let items: VenueAutocomplete[] = data.results.map(x => {
            return {
                place_id: x.place_id,
                description: x.name,
                address: x.formatted_address
            }
        })
        return {
            predictions: items
        }
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