const AWS = require('aws-sdk')
const { sendResponse, validateInput } = require("../functions");

const cognito = new AWS.CognitoIdentityServiceProvider()

	
module.exports.signup = function (event, context, callback) {

    const isValid = validateInput(event.body)
    if (!isValid) {
        return sendResponse(400, { message: 'Invalid input' })
    }

    const response = {
        statusCode: 200,
        headers: {
          'x-custom-header': 'My Header Value',
        },
        body: JSON.stringify({ message: 'Hello World!' }),
      };
     
      callback(null, response);

}