import * as AWS from "aws-sdk"
import * as crypto from "crypto"
import { Deal } from "../shared/Deal";
import { VenueDeals } from "../shared/Venue"
import { Venue } from "../shared/Venue"

const VENUES_TABLE = process.env.VENUES_TABLE!;

export class VenueDAO {

    dynamoDB: AWS.DynamoDB.DocumentClient

    constructor(dynamoDB: AWS.DynamoDB.DocumentClient) {
        this.dynamoDB = dynamoDB
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
          console.log(result);
          let venue: any
          let deals: Deal[] = []

          for (let item of result.Items) {
              if (item.compoundID.startsWith("VENUE#")) {
                venue = item as Venue;
              } else {
                deals.push(item as Deal)
              }
          }
          
          return { venue, deals }
    }

    async addDeal(placeID: string, deal: Deal): Promise<Deal> {
        let dealID = crypto.randomUUID()

        let item = {
            placeID: placeID,
            compoundID: `DEAL#${dealID}`,
            days: deal.days,
            text: deal.text,
            links: deal.link,
            timeStart: deal.timeStart,
            timeEnd: deal.timeEnd
        }

        const params = {
            TableName: VENUES_TABLE,
            Item: item,
        };

        let result = await this.dynamoDB.put(params).promise();
        console.log(result);
        return item;
    }

}