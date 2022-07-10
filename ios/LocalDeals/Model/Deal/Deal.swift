//  Created by Alexander Skorulis on 1/7/2022.

import Foundation

struct Deal: Codable {
    let timeStart: Int?
    let timeEnd: Int?
    let days: [Int]?
    let features: [Int]
    let placeID: String
    let link: String?
    let text: String
    let compoundID: String
    let status: String
    
}

extension Deal: Identifiable {
    var id: String { compoundID }
}
