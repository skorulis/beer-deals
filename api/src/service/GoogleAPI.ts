import axios from 'axios';

import { Secrets } from "../model/Secrets";



export class GoogleAPI {

    readonly baseURL = "https://maps.googleapis.com/maps/api/";

    async autocomplete(text): Promise<any> {
        let url = `${this.baseURL}place/autocomplete/json?key=${Secrets.googleAPIKey}&input=${text}`;
        console.log(url);
        const { data, status } = await axios.get(url);
        console.log(data)
        return data;
    }
}