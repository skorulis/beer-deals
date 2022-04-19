
import { Secrets } from "../model/Secrets";

export class MainAPI {

    readonly baseURL = "http://localhost:3000/"

    async autocomplete(text: string): Promise<any> {
        let url = `${this.baseURL}place/autocomplete/json?key=${Secrets.googleAPIKey}&input=${text}`
        const response = await fetch(url);
        return response.json();
    }
}