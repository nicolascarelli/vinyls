const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const {
    pathParameters: { id }
  } = event;
  const params = {
    TableName: "vinyls",
    Key: { id }
  };
  try {
    const data = await documentClient.delete(params).promise();
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
    },
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500
    };
  }
};