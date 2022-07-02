//  Created by Alexander Skorulis on 1/7/2022.

import Foundation

struct VenueDeals: Codable {
    
    let venue: Venue
    let deals: [Deal]
    
}

extension VenueDeals: Identifiable {
    
    var id: String { venue.placeID }
}
