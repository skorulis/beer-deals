export interface GooglePlaceDetailsResponse {
    result: GooglePlaceDetails
}

export interface GooglePlaceDetails {
    business_status: string
    name: string
    place_id: string
    rating: number
    types: string[]
    formatted_address: string
    formatted_phone_number: string
    geometry: GooglePlaceGeometry
    website?: string
    opening_hours: GooglePlaceHours
}

export interface GooglePlaceGeometry {
    location: GooglePlaceLocation
}

export interface GooglePlaceLocation {
    lat: number
    lng: number
}

export interface GooglePlaceHours {
    weekday_text: string[]
}