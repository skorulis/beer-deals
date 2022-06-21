
export interface VenueAutocomplete {
    description: string
    address?: string
    place_id: string
}

export interface VenueAutocompleteList {
    predictions: VenueAutocomplete[]
}