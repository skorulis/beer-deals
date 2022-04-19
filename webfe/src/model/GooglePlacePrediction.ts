
export interface GooglePlacePrediction {
    description: string
    matched_substrings: string[]
    place_id: string
    types: string[]
}

export interface GooglePlacePredictionList {
    predictions: GooglePlacePrediction[]
}