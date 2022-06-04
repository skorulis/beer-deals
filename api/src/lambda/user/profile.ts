import { sendResponse, createDB } from "../../util";
import { ProfileModel } from "../../shared/ProfileModel"
import { extractAuth } from "../../middleware/authMiddleware"
import { UserDAO } from "../../service/UserDAO"

let userDAO = new UserDAO(createDB());

module.exports.handler = async (event) => {
    try {
        let auth = await extractAuth(event);
        //let user = await userDAO.find(auth.userID);

        console.log(auth);

        let profile: ProfileModel = {
            name: "Someone",
            email: "testing",
            auth: auth
        }
        return sendResponse(200, profile)
    } catch(e) {
        console.log(e);
        return sendResponse(400, {status: "ERROR", e})
    }
    
}