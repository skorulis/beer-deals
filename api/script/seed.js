const axios = require("axios")
const assert = require("node:assert")

if (process.argv.length < 3) {
    console.log("Usage: node script/seed.js URL")
    process.exit(1);
}

const baseURL =  process.argv[2];
const weekdays = [0, 1, 2, 3, 4];
console.log(`Seeding: ${baseURL}`)

let placeIDs = [
    "ChIJc8e4urevEmsRNZI3b7P2UxA", // Dicks balmain
    "ChIJQ5rh58-xEmsRs4MUruAWEuk", // The Alex
    "ChIJNQib7jSwEmsRY3qRbK3d4Hk", // Rose of austrlia
    "ChIJpY9u1NuxEmsRR75IHCbP8NE", // Noble hops
    "ChIJcfCqf86xEmsRo3Z2wW9rGgA", // The camelia
    "ChIJ65n5rmKxEmsR197tvv0f3-E", // Atomic brewery
]

function isString(value) {
    return (typeof value === 'string' || value instanceof String)
}

async function addVenue(id) {
    let url = `${baseURL}/venue/add`
    let body = {placeID: id}
    try {
        const { data, status } = await axios.post(url, body);
        console.log(data)
    } catch(e) {
        console.log(e);
    }   
}

async function addDeal(placeID, days, text, link, timeStartString, timeEndString, features) {
    assert(Array.isArray(days))
    assert(Array.isArray(features))
    assert(isString(text))

    let url = `${baseURL}/deal`
    let timeStart = toMinutes(timeStartString)
    let timeEnd = toMinutes(timeEndString)
    let body = {
        placeID, days, text, link, timeStart, timeEnd, features
    }
    console.log(body)
    try {
        const {data, status } = await axios.post(url, body);
        console.log(data)
    } catch(e) {
        console.log(e);
    }
}

async function doAll() {
    //await addPlaces()    
    await addDeals()
}

async function addPlaces() {
    for(let place of placeIDs) {
        await addVenue(place)
    }
}

async function addDeals() {
    // The camelia
    await addDeal("ChIJcfCqf86xEmsRo3Z2wW9rGgA", weekdays, "Happy Hour", undefined, "16:00", "18:00", [3])
    await addDeal("ChIJcfCqf86xEmsRo3Z2wW9rGgA", [5,6], "Happy Hour", undefined, "12:00", "14:00", [3])

    // Dicks hotel
    let dickWhatsOn = "http://www.dickshotelbalmain.com/whats-on-1";
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", weekdays, "Happy Hour. $5.50 house beers and house wines", dickWhatsOn, "16:00", "18:00", [3,10,11]);
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [2], "$15 Schnitzels. Lunch and dinner", dickWhatsOn, undefined, undefined,[1,2,30]);
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [3], "$12 Tommy's margs", dickWhatsOn, "18:00", "20:00", [3,13]);
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [3], "3 tacos for $12", dickWhatsOn, undefined, undefined, [1,2,32]);
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [4], "$12 espresso martinis", dickWhatsOn, "18:00", "20:00", [3,13]);
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [6], "Pints for schooner prices", dickWhatsOn, "16:00", "18:00", [3, 10]);

    // Rose of Australia
    let roseLink = "https://www.roseofaustralia.com.au/happening"
    await addDeal("ChIJNQib7jSwEmsRY3qRbK3d4Hk", [1], "$19 schitzels", roseLink, "19:00", undefined, [4, 31])
    await addDeal("ChIJNQib7jSwEmsRY3qRbK3d4Hk", weekdays, "35% off tap beer, spirits and wines. Excludes public holidays", roseLink, "15:00", "18:00", [3, 10, 11, 12])
    await addDeal("ChIJNQib7jSwEmsRY3qRbK3d4Hk", [0, 1, 2, 3, 4, 5, 6], "$18 rump steak", roseLink, "12:00", "16:00", [4, 30]);
    await addDeal("ChIJNQib7jSwEmsRY3qRbK3d4Hk", [2], "Steak night. $18 rump. $25 scotch fillet", roseLink, "16:00", undefined, [4, 30]);

    // The Alex
    await addDeal("ChIJQ5rh58-xEmsRs4MUruAWEuk", weekdays, "Happy Hour. $7 house pints, wine and spirits.", "https://merivale.com/whatson/the-alex-happy-hour/", "17:00", "19:00", [3, 10, 11, 12])
    await addDeal("ChIJQ5rh58-xEmsRs4MUruAWEuk", weekdays, "Lunch Specials. $25 meal & drink combos.", "https://merivale.com/whatson/lunch-specials-the-alex/", "12:00", "15:00", [3, 4])
    
    // Atomic brewery


}

function toMinutes(time) {
    if (!time) {
        return undefined
    }
    let parts = time.split(":")
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
}

doAll();