//  Created by Alexander Skorulis on 1/7/2022.

import Foundation
import ASKCore

enum MainRequests {
    
    static var home: HTTPJSONRequest<[VenueDeals]> {
        return HTTPJSONRequest(endpoint: "home")
    }
}
