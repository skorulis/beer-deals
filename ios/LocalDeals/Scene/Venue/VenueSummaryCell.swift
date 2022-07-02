//  Created by Alexander Skorulis on 2/7/2022.

import Foundation
import SwiftUI

// MARK: - Memory footprint

struct VenueSummaryCell {
    
    let venueDeals: VenueDeals
    
}

// MARK: - Rendering

extension VenueSummaryCell: View {
    
    var body: some View {
        HStack {
            image
            VStack(alignment: .leading) {
                Text(venue.name)
                    .font(.title3).bold()
                Text("\(venueDeals.deals.count) deals")
            }
            Spacer()
        }
        
    }
    
    @ViewBuilder
    private var image: some View {
        if let image = venue.imageURL, let url = URL(string: image) {
            AsyncImage(url: url) { image in
                image
                    .resizable()
                    .frame(width: Metrics.imageSize, height: Metrics.imageSize)
                    .clipShape(Circle())
            } placeholder: {
                placeholderImage
            }
        } else {
            placeholderImage
        }
    }
    
    private var placeholderImage: some View {
        ZStack {
            Circle()
                .fill(Color.gray.opacity(0.5))
            Image(systemName: "photo")
                .resizable()
                .frame(width: Metrics.imageSize/2, height: Metrics.imageSize/2)
        }
        .frame(width: Metrics.imageSize, height: Metrics.imageSize)
        
    }
}

// MARK: - Computed variables

extension VenueSummaryCell {
    var venue: Venue { venueDeals.venue }
}

// MARK: - Constants

extension VenueSummaryCell {
    enum Metrics {
        static let imageSize: CGFloat = 80
    }
}

// MARK: - Previews

struct VenueSummaryCell_Previews: PreviewProvider {
    
    static var previews: some View {
        let input = VenueDeals(venue: venue, deals: [deal])
        VenueSummaryCell(venueDeals: input)
    }
    
    private static var venue: Venue {
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
    
    private static var deal: Deal {
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
}

