const axios = require("axios")

if (process.argv.length < 4) {
    console.log("Usage: node script/seed.js URL venueID")
    process.exit(1);
}

const baseURL =  process.argv[2];
const venueID = process.argv[3];

console.log(`Delete deals for ${venueID}`)

async function deleteSingle(venueID, dealID) {
    let url = `${baseURL}/deal`
    let body = {
        placeID: venueID,
        dealID
    }
    try {
        const {data, status } = await axios.delete(url, {data: body});
        console.log("DELETED: " + dealID)
    } catch(e) {
        console.log("FAILED TO DELETE: " + dealID)
        //console.log(e);
    }
}

async function deleteDeals(venueID) {
    let url = `${baseURL}/venue/${venueID}`
    try {
        const {data, status } = await axios.get(url);
        let deals = data.deals;
        console.log("Deleting " + deals.length + " deals")
        for (let deal of deals) {
            await deleteSingle(venueID, deal.compoundID)
        }
    } catch(e) {
        console.log(e);
    }
}

deleteDeals(venueID)