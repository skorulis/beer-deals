//  Created by Alexander Skorulis on 1/7/2022.

import Foundation
import ASKCore

// MARK: - Memory footprint

final class HomeViewModel: ObservableObject {
    
    private let network: HTTPService
    private let errorService: PErrorService
    
    @Published var venueList: [VenueDeals] = []
    
    init(network: HTTPService,
         errorService: PErrorService
    ) {
        self.network = network
        self.errorService = errorService
    }
}

// MARK: - Logic

extension HomeViewModel {
    
    func onAppear() {
        Task { @MainActor in
            self.venueList = try await network.execute(request: MainRequests.home)
        }
        .handleError(service: errorService)
        
    }
}
