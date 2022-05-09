import { sendResponse } from "../util";
import { ProfileModel } from "../shared/ProfileModel"

module.exports.handler = async (event) => {
    let auth = event.requestContext.authorizer.claims

    console.log(event)

    let profile: ProfileModel = {
        name: "Someone",
        email: "Email"
    }
    return sendResponse(200, profile)

}