import * as AWS from "aws-sdk"
import * as crypto from "crypto"
import { Report, ReportStatus} from "../shared/Report";
import { Status } from "../shared/Status";

const REPORTS_TABLE = process.env.REPORTS_TABLE!;

export class ReportDAO {

    dynamoDB: AWS.DynamoDB.DocumentClient

    constructor(dynamoDB: AWS.DynamoDB.DocumentClient) {
        this.dynamoDB = dynamoDB
    }

    async openReports(): Promise<Report[]> {
        // TODO: Need to filter to only open reports
        const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
            TableName: REPORTS_TABLE,
        }

        let result = await this.dynamoDB.scan(queryParams).promise();
        return result.Items as Report[]
    }

    async add(placeID: string,  userID: string, dealID: string, reason: string): Promise<Status> {
        let report: Report = {
            placeID, userID, dealID, reason,
            reportID: crypto.randomUUID(),
            reportStatus: ReportStatus.new
        }

        const putParams = {
            TableName: REPORTS_TABLE,
            Item: report,
        };

        let putResult = await this.dynamoDB.put(putParams).promise()
        return {status: "ok"}
    }

    async set(reportID: string, status: ReportStatus): Promise<Status> {
        const updateParams: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: REPORTS_TABLE,
            Key: {
                "reportID": reportID
            },
            UpdateExpression: "set reportStatus = :reportStatus",
            ExpressionAttributeValues: {
                ":reportStatus": status
            }
        }
        let result = await this.dynamoDB.update(updateParams).promise()
        console.log(result);

        return {status: "ok"}
    }
}