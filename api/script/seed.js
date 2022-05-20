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

async function addDeal(placeID, days, text, link, timeStartString, timeEndString) {
    let url = `${baseURL}/deal`
    let timeStart = toMinutes(timeStartString)
    let timeEnd = toMinutes(timeEndString)
    let body = {
        placeID, days, text, link, timeStart, timeEnd
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
    await addDeal("ChIJcfCqf86xEmsRo3Z2wW9rGgA", [0,1,2,3,4], "Happy Hour", undefined, "16:00", "18:00")
    await addDeal("ChIJcfCqf86xEmsRo3Z2wW9rGgA", [5,6], "Happy Hour", undefined, "12:00", "14:00")
}

function toMinutes(time) {
    let parts = time.split(":")
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
}


doAll();