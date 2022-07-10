//  Created by Alexander Skorulis on 2/7/2022.

import ASSwiftUI
import Foundation
import SwiftUI

// MARK: - Memory footprint

struct FullVenueView {
    
    @StateObject var viewModel: FullVenueViewModel
    
}

// MARK: - Rendering

extension FullVenueView: View {
    
    var body: some View {
        ZStack {
            content
            
            NavigationHelper.invisible(selection: $viewModel.isMapShowing) {
                Text("TEST")
            }
        }
        .navigationBarTitleDisplayMode(.inline)
    }
    
    private var content: some View {
        ScrollView {
            VStack {
                VenueSummaryCell(venueDeals: viewModel.venueDeals)
                venueDetails
                deals
            }
        }
    }
    
    private var venueDetails: some View {
        VStack {
            Text(viewModel.venue.address)
            icons
        }
    }
    
    private var icons: some View {
        HStack {
            mapButton
        }
    }
    
    private var mapButton: some View {
        Button(action: viewModel.showMap) {
            Image(systemName: "map")
        }
    }
    
    private var deals: some View {
        ForEach(viewModel.venueDeals.deals) { deal in
            DealCell(deal: deal)
        }
    }
}

// MARK: - Previews

struct FullVenueView_Previews: PreviewProvider {
    
    static var previews: some View {
        let ioc = IOC()
        let vm = ioc.resolve(FullVenueViewModel.self, argument: DummyDataProvider.venueDeals)
        FullVenueView(viewModel: vm)
    }
}

