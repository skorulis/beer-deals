const IS_OFFLINE = process.env.IS_OFFLINE;

export function extractAuth(event): EventAuth  {
    
    if (IS_OFFLINE) {
        let token = event.headers.Authorization;
        token = token.replace("Bearer ", "");
        return {
            userID: token
        }
    } else {
        console.log(event);
        let auth = event.requestContext.authorizer.claims
        throw "Not implemented yet"
    }
    
}

export interface EventAuth {
    userID: string
} 