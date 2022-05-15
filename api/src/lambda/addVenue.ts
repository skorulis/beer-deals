import { sendResponse, createDB } from "../util";
import { UserDAO } from "../service/UserDAO"
import { VenueDAO } from "../service/VenueDAO";
import { AddVenueRequest } from "../shared/AddVenueRequest" 
import { GoogleAPI } from "../service/GoogleAPI";
import * as AWS from "aws-sdk"

const s3 = new AWS.S3();

let dynamoDb = createDB()
let venueDAO = new VenueDAO(dynamoDb);
let userDAO = new UserDAO(dynamoDb);
let api = new GoogleAPI();
const IMAGE_BUCKET = process.env.IMAGE_BUCKET;

const BUCKET_URL = "https://d8tgumoi4tn1g.cloudfront.net";

module.exports.handler = async (event) => {
    const body = JSON.parse(event.body) as AddVenueRequest
    let details = await api.details(body.placeID);
    let photoURL: string | undefined
    if (details.photos.length > 0) {
        let photoID = details.photos[0].photo_reference
        let photo = await api.getPhoto(photoID)
        console.log("Write image " + photo.byteLength)
        let params: AWS.S3.PutObjectRequest = {
            Bucket: IMAGE_BUCKET!,
            Key: photoID + ".jpeg",
            Body: photo,
            ContentType: "image/jpeg"
        }
        let result = await s3.putObject(params).promise()
        photoURL = `${BUCKET_URL}/${photoID}.jpeg`
    }

    try {
        let venue = await venueDAO.add(details, photoURL);
        return sendResponse(200, venue)
    } catch(error) {
        return sendResponse(400, {status: "ERROR", error})
    }    
}