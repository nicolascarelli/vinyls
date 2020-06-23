const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
const validate = require('./validate')

exports.handler = async event => {
  const {
    pathParameters: { id }
  } = event;

  const body = JSON.parse(event.body)
  const { error } = validate(body)
  
  if (error) {
    return {
      statusCode: 500,
      body: error.details[0].message
    };
  }

  const { title, band, album } = body;

  const params = {
    TableName: "vinyls",
    Item: {
      id: id,
      title: title,
      band: band,
      album: album
    }
  };
  try {
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
      },
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500
    };
  }
};