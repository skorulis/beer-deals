const axios = require("axios")

if (process.argv.length < 3) {
    console.log("Usage: node script/seed.js URL")
    process.exit(1);
}

const baseURL =  process.argv[2];
console.log(`Seeding: ${baseURL}`)

let placeIDs = [
    "ChIJc8e4urevEmsRNZI3b7P2UxA", // Dicks balmain
    "ChIJQ5rh58-xEmsRs4MUruAWEuk", // The Alex
    "ChIJNQib7jSwEmsRY3qRbK3d4Hk", // Rose of austrlia
    "ChIJpY9u1NuxEmsRR75IHCbP8NE", // Noble hops
    "ChIJcfCqf86xEmsRo3Z2wW9rGgA" // The camelia
]

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
    for(let place of placeIDs) {
        await addVenue(place)
    }

    // The camelia
    await addDeal("ChIJcfCqf86xEmsRo3Z2wW9rGgA", [0,1,2,3,4], "Happy Hour", undefined, "16:00", "18:00", [3])
    await addDeal("ChIJcfCqf86xEmsRo3Z2wW9rGgA", [5,6], "Happy Hour", undefined, "12:00", "14:00", [3])

    // Dicks hotel
    let dickWhatsOn = "http://www.dickshotelbalmain.com/whats-on-1";
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [0,1,2,3,4], "Happy Hour. $5.50 house beers and house wines", dickWhatsOn, "16:00", "18:00", [3,10,11]);
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [2], "$15 Schnitzels. Lunch and dinner", dickWhatsOn, undefined, undefined,[1,2,30]);
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [3], "$12 Tommy's margs", dickWhatsOn, "18:00", "20:00", [3,13]);
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [3], "3 tacos for $12", dickWhatsOn, undefined, undefined, [1,2,32]);
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [4], "$12 espresso martinis", dickWhatsOn, "18:00", "20:00", [3,13]);
    await addDeal("ChIJc8e4urevEmsRNZI3b7P2UxA", [6], "Pints for schooner prices", dickWhatsOn, "16:00", "18:00", [3, 10]);


}

function toMinutes(time) {
    if (!time) {
        return undefined
    }
    let parts = time.split(":")
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
}


doAll();