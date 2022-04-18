module.exports.private = function (event, context, callback) {

    const response = {
        statusCode: 200,
        headers: {
          'x-custom-header': 'My Header Value',
        },
        body: JSON.stringify({ message: 'PRIVATE' }),
      };
     
      callback(null, response);

}