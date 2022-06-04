const IS_OFFLINE = process.env.IS_OFFLINE;
import jwt from "jsonwebtoken"
import jwkToPem from "jwk-to-pem"
import publicKeys from "../resource/aws_jwks.json"

export async function extractAuth(event): Promise<EventAuth>  {
    console.log(event);
    let token = event.headers.Authorization || event.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        throw `Invalid bearer token: ${token}`
    }
    token = token.replace("Bearer ", "");
    
    if (IS_OFFLINE) {
        return {
            userID: token
        }
    } else {
        console.log(token)
        console.log(publicKeys)

        let pem = jwkToPem(publicKeys.keys[0])
        console.log("Decoded PEM")
        let verifiedKey = await jwt.verify(token, pem)
        console.log(verifiedKey)

        return {
            userID: verifiedKey['cognito:username']
        }
    }
    
}

export interface EventAuth {
    userID: string
} 