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
                    .multilineTextAlignment(.leading)
                    .foregroundColor(.neutral900)
                Text("\(venueDeals.deals.count) deals")
                    .foregroundColor(.neutral900)
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
                .fill(Color.neutral100)
            Image(systemName: "photo")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: Metrics.imageSize/2, height: Metrics.imageSize/2)
                .foregroundColor(.neutral900)
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
        let input = VenueDeals(venue: DummyDataProvider.venue,
                               deals: [DummyDataProvider.deal])
        VenueSummaryCell(venueDeals: input)
    }
    
    
}

