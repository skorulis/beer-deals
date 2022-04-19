
export class MainAPI {

    readonly baseURL = "http://localhost:3000/"

    async autocomplete(text: string): Promise<any> {
        let url = `${this.baseURL}venue/autocomplete?query=${text}`
        console.log(url)
        const response = await fetch(url);
        return response.json();
    }
}