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
    }
    
    private var content: some View {
        ScrollView {
            VStack {
                
            }
        }
    }
    
}
