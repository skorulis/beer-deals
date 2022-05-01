import * as AWS from "aws-sdk"
import * as crypto from "crypto"
import { Report ,ReportEntry, ReportStatus} from "../model/Report";
import { Status } from "../shared/Status";

const REPORTS_TABLE = process.env.REPORTS_TABLE!;

export class ReportDAO {

    dynamoDB: AWS.DynamoDB.DocumentClient

    constructor(dynamoDB: AWS.DynamoDB.DocumentClient) {
        this.dynamoDB = dynamoDB
    }

    async add(placeID: string,  userID: string, reason: string): Promise<Status> {
        const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
            TableName: REPORTS_TABLE,
            KeyConditionExpression: "#placeID = :placeID", 
            ExpressionAttributeNames: {
              "#placeID": "placeID"
            },
            ExpressionAttributeValues: {
              ":placeID": placeID,
            }
        }

        let entry: ReportEntry = {
            userID, reason, 
            reportID: crypto.randomUUID(), 
            status: ReportStatus.new
            
        }
        // TODO: How to lock the database entry between query and push
        let result = await this.dynamoDB.query(queryParams).promise();
        let report: Report
        if (result.Items && result.Items.length > 0) {
            report = result.Items[0] as Report
        } else {
            report = {
                placeID: placeID,
                entries: []
            }
        }

        report.entries.push(entry);

        const putParams = {
            TableName: REPORTS_TABLE,
            Item: report,
        };

        let putResult = await this.dynamoDB.put(putParams).promise()
        return {status: "ok"}
    }
}