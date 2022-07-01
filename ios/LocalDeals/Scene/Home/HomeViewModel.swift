//  Created by Alexander Skorulis on 1/7/2022.

import Foundation
import ASKCore

// MARK: - Memory footprint

final class HomeViewModel: ObservableObject {
    
    private let network: HTTPService
    
    init(network: HTTPService) {
        self.network = network
    }
}

// MARK: - Logic

extension HomeViewModel {
    
    func onAppear() {
        Task { @MainActor in
            let result = try await network.execute(request: MainRequests.home)
            print(result)
        }
        
    }
}
