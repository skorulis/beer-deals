//
//  LocalDealsApp.swift
//  LocalDeals
//
//  Created by Alexander Skorulis on 29/6/2022.
//

import SwiftUI

@main
struct LocalDealsApp: App {
    
    let ioc = IOC()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.factory, ioc)
        }
    }
}
