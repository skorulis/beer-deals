import { Component } from "react"; 
import { DealFeature, featureText } from "../../shared/deal/DealFeature";
import { HStack } from "@chakra-ui/react";

export class FeatureList extends Component<{features:DealFeature[]}> {

    constructor(props: {features: DealFeature[]}) {
        super(props);
    }
    
    render() {
        return <HStack>
            {this.elementList()}
        </HStack>
    }

    elementList() {
        return this.props.features.map(x => this.singleItem(x))
    }

    singleItem(feature: DealFeature) {
        let name = this.imageName(feature);
        let alt = featureText(feature);
        return <img src={`/feature_icons/${name}`} alt={alt} width="30" height="30" />
    }

    imageName(feature: DealFeature): string {
        switch (feature) {
            case DealFeature.LUNCH: return "lunch.svg"
            case DealFeature.DINNER: return "dinner.svg"
            case DealFeature.DRINKS: return "drinks.svg"
            case DealFeature.FOOD: return "dinner.svg"
            case DealFeature.BEER: return "beer.svg"
            case DealFeature.WINE: return "wine.svg"
            case DealFeature.SPIRITS: return "spririts.png"
            case DealFeature.COCKTAILS: return "cocktail.svg"
            case DealFeature.STEAK: return "steak.svg"
            case DealFeature.SCHNITZEL: return "schnitzel.svg"
            case DealFeature.TACOS: return "taco.svg"
            case DealFeature.PIZZA: return "pizza.svg"
            case DealFeature.ROAST: return "roast.svg"
            case DealFeature.WINGS: return "wings.svg"
            case DealFeature.DUMPLINGS: return "dumpling.png"
        }
    }

}