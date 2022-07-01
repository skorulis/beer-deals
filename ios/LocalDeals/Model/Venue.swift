//  Created by Alexander Skorulis on 1/7/2022.

import Foundation

struct Venue: Codable {
    let website: String?
    let types: [String]
    let address: String
    let lng: Double
    let lat: Double
    let imageURL: String?
    let placeID: String
    let name: String
    let rating: Double
    let priceLevel: Int
    let compoundID: String
    
}
