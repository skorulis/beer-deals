//  Created by Alexander Skorulis on 2/7/2022.

import Foundation

enum DummyDataProvider {
    
    static var venue: Venue {
        return Venue(website: "https://google.com",
                     types: [""],
                     address: "23 some street",
                     lng: 100,
                     lat: 100,
                     imageURL: "https://localdeals.click/Aap_uECNu4QwvYXnuV91eiQhj_DcmQXPS7gPi1yUrU-hkxLQMUhfBVVpqxJV0dS2hok7mxGyXuqNWacmazUVutqxhPdgIOz2knT354Egze7Gam2bJI62hplvijD3aeNg8UvQLlQYrnTui_s7K6k4qAehqKuyhRmUdRmzGx_EWYT68hF2FCBf.jpeg",
                     placeID: "ABC",
                     name: "My venue",
                     rating: 4,
                     priceLevel: 1,
                     compoundID: "ABC"
        )
    }
    
    static var deal: Deal {
        return Deal(timeStart: nil,
                    timeEnd: nil,
                    days: [0],
                    features: [1],
                    placeID: "ABC",
                    link: nil,
                    text: "Some deal",
                    compoundID: "ABC",
                    status: "NEW"
        )
    }
    
    static var venueDeals: VenueDeals {
        return VenueDeals(venue: DummyDataProvider.venue,
                          deals: [DummyDataProvider.deal])
    }
    
}
