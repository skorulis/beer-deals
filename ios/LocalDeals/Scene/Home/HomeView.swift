//  Created by Alexander Skorulis on 1/7/2022.

import Foundation
import SwiftUI

// MARK: - Memory footprint

struct HomeView {
    
    @StateObject var viewModel: HomeViewModel
    
}

extension HomeView: View {
    
    var body: some View {
        content
            .onAppear(perform: viewModel.onAppear)
            .navigationTitle("Home")
    }
    
    private var content: some View {
        ScrollView {
            VStack {
                ForEach(viewModel.venueList) { item in
                    VenueSummaryCell(venueDeals: item)
                }
            }
            .padding(.horizontal)
        }
    }
    
    
    
}
