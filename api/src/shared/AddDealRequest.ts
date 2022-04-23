import { Deal } from "./Deal";

export interface AddDealRequest {
    deal: Deal
    placeID: string
}