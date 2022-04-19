
import { Secrets } from "../model/Secrets";

export class GoogleAPI {

    readonly baseURL = "https://maps.googleapis.com/maps/api/"

    async autocomplete(text: string): Promise<any> {
        let url = `${this.baseURL}place/autocomplete/json?key=${Secrets.googleAPIKey}&input=${text}`
        const response = await fetch(url);
        return response.json();
    }
}