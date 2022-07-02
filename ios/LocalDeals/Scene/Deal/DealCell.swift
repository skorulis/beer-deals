//
//  DealCell.swift
//  LocalDeals
//
//  Created by Alexander Skorulis on 2/7/2022.
//

import Foundation
import SwiftUI

// MARK: - Memory footprint

struct DealCell {
    
    let deal: Deal
    
}

// MARK: - Rendering

extension DealCell: View {
    
    var body: some View {
        HStack {
            Text(deal.text)
                .multilineTextAlignment(.leading)
            
            Spacer()
        }
    }
}

// MARK: - Previews

struct DealCell_Previews: PreviewProvider {
    
    static var previews: some View {
        DealCell(deal: DummyDataProvider.deal)
    }
}

