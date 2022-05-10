import * as AWS from "aws-sdk"
import * as crypto from "crypto"
import { Deal, DealStatus } from "../shared/Deal";
import { VenueDeals } from "../shared/Venue"
import { Venue } from "../shared/Venue"
import { DayOfWeek } from "../shared/DayOfWeek";
import { GooglePlaceDetails } from "../model/GooglePlaceDetails";

const VENUES_TABLE = process.env.VENUES_TABLE!;

export class VenueDAO {

    dynamoDB: AWS.DynamoDB.DocumentClient

    constructor(dynamoDB: AWS.DynamoDB.DocumentClient) {
        this.dynamoDB = dynamoDB
    }

    async add(details: GooglePlaceDetails): Promise<Venue> {
        let venue: Venue = {
            placeID: details.place_id,
            compoundID: `VENUE#${details.place_id}`,
            address: details.formatted_address,
            name: details.name,
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
          }
        
          const params = {
            TableName: VENUES_TABLE,
            Item: venue
          };

          await this.dynamoDB.put(params).promise();
          return venue;
    }

    async loadFullVenue(id: string): Promise<VenueDeals> {
        const params: AWS.DynamoDB.DocumentClient.QueryInput = {
            TableName: VENUES_TABLE,
            KeyConditionExpression: "#placeID = :placeID", 
            ExpressionAttributeNames: {
              "#placeID": "placeID"
            },
            ExpressionAttributeValues: {
              ":placeID": id,
            }
          }
          let result = await this.dynamoDB.query(params).promise();
          
          if (!result.Items || result.Items.length == 0) {
              throw new Error("Venue not found")
          }
          return this.combineDeals(result.Items)[0]
    }

    async addDeal(placeID: string, days: DayOfWeek[], text: string, timeStart: number, timeEnd: number, link?: string): Promise<Deal> {
        let dealID = crypto.randomUUID()

        let item = {
            status: DealStatus.new,
            placeID: placeID,
            created: new Date(),
            compoundID: `DEAL#${dealID}`,
            days: days,
            text: text,
            link: link,
            timeStart: timeStart,
            timeEnd: timeEnd
        }

        const params = {
            TableName: VENUES_TABLE,
            Item: item,
        };

        let result = await this.dynamoDB.put(params).promise();
        console.log(result);
        return item;
    }

    async homeVenues(): Promise<VenueDeals[]> {
        const params: AWS.DynamoDB.DocumentClient.QueryInput = {
            TableName: VENUES_TABLE
        }
        
        let result = await this.dynamoDB.scan(params).promise();
        if (!result.Items || result.Items.length == 0) {
            throw new Error("No venues")
        }
        return this.combineDeals(result.Items)
    }

    combineDeals(items?: any): VenueDeals[] {
        if (!items || items.length == 0) {
            return []
        }
        let venues: Venue[] = []
        let deals: {} = {}

        for (let item of items) {
            if (item.compoundID.startsWith("VENUE#")) {
              venues.push(item as Venue)
            } else {
                let array = deals[item.placeID] || []
                array.push(item as Deal)
                deals[item.placeID] = array
            }
        }
        return venues.map(x => {
            return {venue: x, deals: deals[x.placeID] || []}
        })
    }

}