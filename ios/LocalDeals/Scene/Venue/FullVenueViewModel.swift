//  Created by Alexander Skorulis on 2/7/2022.

import Foundation

// MARK: - Memory footprint

final class FullVenueViewModel: ObservableObject {
    
    let venueDeals: VenueDeals
    
    @Published var isMapShowing: Bool = false
    
    public init(venueDeals: VenueDeals) {
        self.venueDeals = venueDeals
    }
    
}

// MARK: - Computed variables

extension FullVenueViewModel {
    
    var venue: Venue {
        return venueDeals.venue
    }
    
}

// MARK: - Logic

extension FullVenueViewModel {
    
    func showMap() {
        isMapShowing = true
    }
    
}
