import * as AWS from "aws-sdk"
import * as crypto from "crypto"
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
}