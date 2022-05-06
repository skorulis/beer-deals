import * as AWS from "aws-sdk"
import { Status } from "../shared/Status";

const USERS_TABLE = process.env.USERS_TABLE!;

export class UserDAO {

    dynamoDB: AWS.DynamoDB.DocumentClient

    constructor(dynamoDB: AWS.DynamoDB.DocumentClient) {
        this.dynamoDB = dynamoDB
    }

    async create(userID: string,  email: string): Promise<Status> {
        let user = {
            userID, email
        }

        const putParams = {
            TableName: USERS_TABLE,
            Item: user,
        };

        console.log(putParams)

        await this.dynamoDB.put(putParams).promise()
        return {status: "OK" }
    }

    async find(userID: string) {
        const params: AWS.DynamoDB.DocumentClient.QueryInput = {
            TableName: USERS_TABLE,
            KeyConditionExpression: "userID = :userID", 
            ExpressionAttributeValues: {
              ":userID": userID,
            }
          }
        let result = await this.dynamoDB.query(params).promise();
        if (!result.Items || result.Items.length == 0) {
            throw `Could not find user: ${userID}`
        }
        return result.Items[0]
    }
}