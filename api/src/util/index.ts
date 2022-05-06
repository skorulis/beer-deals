import * as AWS from "aws-sdk"
const IS_OFFLINE = process.env.IS_OFFLINE;

export function sendResponse(statusCode, body) {
    const response = {
        statusCode: statusCode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        }
    }
    return response
}

export function createDB() {
    if (IS_OFFLINE === 'true') {
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
            accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
            secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
        })
  } else {
    return new AWS.DynamoDB.DocumentClient();
  };
}