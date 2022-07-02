//  Created by Alexander Skorulis on 29/6/2022.

import ASKCore
import Foundation
import SwinjectAutoregistration

// MARK: - Memory footprint

final class IOC: IOCService {
    
    override init() {
        super.init()
        registerServices()
        registerViewModels()
    }
    
}

// MARK: - Logic

private extension IOC {
    
    func registerServices() {
        container.autoregister(HTTPLogger.self, initializer: HTTPLogger.init)
        container.register(HTTPService.self) { res in
            return HTTPService(baseURL: "http://localhost:3000", logger: res.resolve(HTTPLogger.self))
        }
        container.autoregister(PErrorService.self, initializer: LogErrorService.init)
    }
    
    func registerViewModels() {
        container.autoregister(HomeViewModel.self, initializer: HomeViewModel.init)
    }
    
}
