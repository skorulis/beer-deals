//  Created by Alexander Skorulis on 1/7/2022.

import Foundation
import SwiftUI
import ASSwiftUI

// MARK: - Memory footprint

struct HomeView {
    
    @StateObject var viewModel: HomeViewModel
    @Environment(\.factory) private var factory
    
}

extension HomeView: View {
    
    var body: some View {
        ZStack {
            content
                .onAppear(perform: viewModel.onAppear)
                .navigationTitle("Home")
            
            NavigationHelper.invisible(selection: $viewModel.selected) { item in
                FullVenueView(viewModel: factory.resolve(FullVenueViewModel.self, argument: item))
            }
        }
    }
    
    private var content: some View {
        ScrollView {
            VStack {
                ForEach(viewModel.venueList) { item in
                    Button(action: {viewModel.select(item)}) {
                        VenueSummaryCell(venueDeals: item)
                            .contentShape(Rectangle())
                    }
                }
            }
            .padding(.horizontal)
        }
    }
    
    
    
}
