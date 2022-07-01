//
//  ContentView.swift
//  LocalDeals
//
//  Created by Alexander Skorulis on 29/6/2022.
//

import SwiftUI

struct ContentView: View {
    
    @Environment(\.factory) private var factory
    
    var body: some View {
        HomeView(viewModel: factory.resolve())
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
