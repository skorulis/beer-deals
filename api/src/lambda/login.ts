import { LoginRequest } from "../shared/AuthRequests"
import { createDB, sendResponse } from "../util";
import * as AWS from "aws-sdk"
import { UserDAO } from "../service/UserDAO";
import { AuthResponse } from "../shared/AuthResponse";

const cognito = new AWS.CognitoIdentityServiceProvider()

const IS_OFFLINE = process.env.IS_OFFLINE;
const USER_POOL_ID = process.env.USER_POOL_ID;
const CLIENT_ID = process.env.CLIENT_ID;

let userDAO = new UserDAO(createDB());

module.exports.handler = async (event) => {
    const body = JSON.parse(event.body) as LoginRequest
    try {
        if (IS_OFFLINE) {
            let response = await loginOffline(body.email)
            return sendResponse(200, response)
        } else {
            let response = await loginCognito(body.email, body.password)
            return sendResponse(200, response)
        }
    } catch(error) {
        console.log(error);
        return sendResponse(400, {status: "ERROR", message: "Invalid login details"})
    }
}

async function loginOffline(email: string): Promise<AuthResponse> {
    let user = await userDAO.find(email)
    return {role: "admin", token: email, extra: user};
}

async function loginCognito(email: string, password: string): Promise<AuthResponse> {
    const params = {
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        UserPoolId: USER_POOL_ID!,
        ClientId: CLIENT_ID!,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password
        }
      }

    const response = await cognito.adminInitiateAuth(params).promise();
    let auth: AuthResponse = {
        token: (response.AuthenticationResult?.IdToken)!, 
        role: "admin",
        extra: response
    }
    return auth
}