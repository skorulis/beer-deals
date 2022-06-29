//  Created by Alexander Skorulis on 29/6/2022.

import ASKCore
import Foundation
import SwinjectAutoregistration

// MARK: - Memory footprint

final class IOC: IOCService {
    
    override init() {
        super.init()
        registerServices()
    }
    
}

// MARK: - Logic

private extension IOC {
    
    func registerServices() {
        container.autoregister(HTTPService.self, initializer: HTTPService.init)
    }
    
}
