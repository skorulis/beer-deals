//  Created by Alexander Skorulis on 2/7/2022.

import Foundation

final class FullVenueViewModel: ObservableObject {
    
    let venueDeals: VenueDeals
    
    public init(venueDeals: VenueDeals) {
        self.venueDeals = venueDeals
    }
    
}
