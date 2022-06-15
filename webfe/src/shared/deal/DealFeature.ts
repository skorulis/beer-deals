export enum DealFeature {
    // High level
    LUNCH = 1,
    DINNER = 2,
    DRINKS = 3,
    FOOD = 4,

    // Drinks
    BEER = 10,
    WINE = 11,
    SPIRITS = 12,
    COCKTAILS = 13,

    // Food
    STEAK = 30,
    SCHNITZEL = 31,
    TACOS = 32,
    PIZZA = 33,
    ROAST = 34,
    WINGS = 35,
    DUMPLINGS = 36,
}

export function featureText(feature: DealFeature): string {
    switch (feature) {
        case DealFeature.LUNCH: return "Lunch"
        case DealFeature.DINNER: return "Dinner"
        case DealFeature.DRINKS: return "Drinks"
        case DealFeature.FOOD: return "Food"
        case DealFeature.BEER: return "Beer"
        case DealFeature.WINE: return "Wine"
        case DealFeature.SPIRITS: return "Spririts"
        case DealFeature.COCKTAILS: return "Cocktails"
        case DealFeature.STEAK: return "Steak"
        case DealFeature.SCHNITZEL: return "Schitzel"
        case DealFeature.TACOS: return "Tacos"
        case DealFeature.PIZZA: return "Pizza"
        case DealFeature.ROAST: return "Roast"
        case DealFeature.WINGS: return "Wings"
        case DealFeature.DUMPLINGS: return "Dumplings"

    default:
        return "Unknown"
    }
}