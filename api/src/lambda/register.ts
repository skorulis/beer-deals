import { createDB, sendResponse } from "../util";
import { RegisterRequest } from "../shared/AuthRequests";
import * as AWS from "aws-sdk"
import { UserDAO } from "../service/UserDAO";

const cognito = new AWS.CognitoIdentityServiceProvider()

const IS_OFFLINE = process.env.IS_OFFLINE;
const USER_POOL_ID = process.env.USER_POOL_ID;
const CLIENT_ID = process.env.CLIENT_ID;

let userDAO = new UserDAO(createDB());

module.exports.handler = async (event) => {
    const body = JSON.parse(event.body) as RegisterRequest
    try {
        if (IS_OFFLINE) {
            let response = await registerOffline(body.email, body.password)
            return sendResponse(200, response)
        } else {
            let response = await registerCognito(body.email, body.password)
            return sendResponse(200, response)
        }
    } catch(error) {
        return sendResponse(400, {status: "ERROR", error})
    }

}

async function registerOffline(email: string, password: string) {
    let result = await userDAO.create(email, email)

    return {status: "OK", message: `Created user ${email}`, token: email, result}
}

async function registerCognito(email, password) {
    const params: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest = {
        UserPoolId: USER_POOL_ID!,
        Username: email,
        UserAttributes: [{
          Name: 'email',
          Value: email
        },
        {
          Name: 'email_verified',
          Value: 'true'
        }
      ],
      MessageAction: 'SUPPRESS'
      }
      
    const response = await cognito.adminCreateUser(params).promise();
    if (!response.User) {
        throw "Could not create user"
    }
  
    const paramsForSetPass = {
        Password: password,
        UserPoolId: USER_POOL_ID!,
        Username: email,
        Permanent: true
    };
    await cognito.adminSetUserPassword(paramsForSetPass).promise()
  
    const loginParams = {
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        UserPoolId: USER_POOL_ID!,
        ClientId: CLIENT_ID!,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    }
    const loginResponse = await cognito.adminInitiateAuth(loginParams).promise();
    return {status: "OK", message: `Created user ${email}`, user: response, token: loginResponse.AuthenticationResult?.IdToken}

}