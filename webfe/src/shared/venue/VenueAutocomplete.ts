
export interface VenueAutocomplete {
    description: string
    place_id: string
}

export interface VenueAutocompleteList {
    predictions: VenueAutocomplete[]
}