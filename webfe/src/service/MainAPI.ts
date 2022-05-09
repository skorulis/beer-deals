import { GooglePlacePrediction, GooglePlacePredictionList } from "../model/GooglePlacePrediction";
import { AddDealRequest } from "../shared/AddDealRequest";
import { ActionReportRequest, AddReportRequest } from "../shared/AddReportRequest";
import { Report } from "../shared/Report";
import { VenueDeals } from "../shared/Venue";
import { LoginRequest, RegisterRequest } from "../shared/AuthRequests";
import { AuthResponse } from "../shared/AuthResponse";
import { ProfileModel } from "../shared/ProfileModel";

export class MainAPI {

    token?: string

    baseURL(): string {
        if (process.env.NODE_ENV === "development") {
            return "http://localhost:3000/"
        }
        
        return "https://3vn7clr33g.execute-api.us-east-1.amazonaws.com/dev/"
    }

    public static readonly shared = new MainAPI() 

    async autocomplete(text: string, location?: GeolocationCoordinates): Promise<GooglePlacePredictionList> {
        let url = `${this.baseURL()}venue/autocomplete?query=${text}`
        if (location) {
            url += `&lat=${location.latitude}&lng=${location.longitude}`
        }
        console.log(url)
        const response = await fetch(url);
        let parsed = await response.json()
        return parsed as GooglePlacePredictionList
    }

    async addVenue(place: GooglePlacePrediction) {
        let url = `${this.baseURL()}venue/add`
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

    async getVenues(): Promise<VenueDeals[]> {
        let url = `${this.baseURL()}venue`
        const response = await fetch(url)
        let parsed = await response.json()
        return parsed as VenueDeals[]
    }

    async getVenue(id: string): Promise<VenueDeals> {
        let url = `${this.baseURL()}venue/${id}`
        const response = await fetch(url);
        console.log(url)
        let parsed = await response.json()
        return parsed as VenueDeals
    }

    async addDeal(body: AddDealRequest) {
        let url = `${this.baseURL()}deal`
        let params = {
            method: "POST", 
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, params)
        return response.json()
    }

    async addReport(body: AddReportRequest) {
        let url = `${this.baseURL()}report`
        return this.post(url, body)
    }

    async getReports(): Promise<Report[]> {
        let url = `${this.baseURL()}report`
        const response = await fetch(url);
        let parsed = await response.json()
        return parsed as Report[]
    }

    async actionReport(body: ActionReportRequest) {
        let url = `${this.baseURL()}report/action`
        return this.post(url, body)
    }

    async login(email: string, password: string): Promise<AuthResponse> {
        let url = `${this.baseURL()}auth/login`
        let body: LoginRequest = {email, password}
        return this.post(url, body)
    }

    async register(email: string, password: string): Promise<AuthResponse> {
        let url = `${this.baseURL()}auth/register`
        let body: RegisterRequest = {email, password}
        return this.post(url, body)
    }

    async getProfile(): Promise<ProfileModel> {
        let url = `${this.baseURL()}user/profile`
        return this.get(url)
    } 

    async get<ResponseType>(url: string): Promise<ResponseType> {
        let headers:{[key: string]: string} = {
            'Accept': 'application/json',
        }

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        let params = {
            method: "GET",
            headers: headers
        }
        

        const response = await fetch(url, params);
        return await response.json() as ResponseType
    }

    async post<ResponseType>(url: string, body: any): Promise<ResponseType> {
        let headers:{[key: string]: string} = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        let params = {
            method: "POST", 
            body: JSON.stringify(body),
            headers: headers
        }
        const response = await fetch(url, params)
        return await response.json() as ResponseType
    }


    
}