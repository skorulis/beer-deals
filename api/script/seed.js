const https = require('https')
const http = require("http")
const axios = require("axios")

let placeIDs = [
    "ChIJc8e4urevEmsRNZI3b7P2UxA",
    "ChIJQ5rh58-xEmsRs4MUruAWEuk",
    "ChIJNQib7jSwEmsRY3qRbK3d4Hk",
    "ChIJpY9u1NuxEmsRR75IHCbP8NE",
    "ChIJcfCqf86xEmsRo3Z2wW9rGgA"
]

async function addVenue(id) {
    let url = 'http://localhost:3000/venue/add'
    let body = {placeID: id}
    try {
        const { data, status } = await axios.post(url, body);
        console.log(data)
    } catch(e) {
        console.log(e);
    }
    
}

async function doAll() {
    for(let place of placeIDs) {
        await addVenue(place)
    }
}



doAll();