import axios from 'axios';
import { GooglePlaceDetails, GooglePlaceDetailsResponse } from '../model/GooglePlaceDetails';

import { Secrets } from "../model/Secrets";



export class GoogleAPI {

    readonly baseURL = "https://maps.googleapis.com/maps/api/";

    async autocomplete(text: string): Promise<any> {
        let url = `${this.baseURL}place/autocomplete/json?key=${Secrets.googleAPIKey}&input=${text}`;
        const { data, status } = await axios.get(url);
        console.log(data)
        return data;
    }

    async details(placeID: string): Promise<GooglePlaceDetails> {
        let url = `${this.baseURL}place/details/json?key=${Secrets.googleAPIKey}&place_id=${placeID}`;
        console.log(url)
        const { data, status } = await axios.get<GooglePlaceDetailsResponse>(url)
        console.log(status)
        console.log(data)
        return data.result
    }

    
}