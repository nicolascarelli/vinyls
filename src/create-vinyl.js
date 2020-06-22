const AWS = require("aws-sdk");
const crypto = require("crypto");
const validate = require('./validate')

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  
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
    TableName: "vinyls", // The name of your DynamoDB table
    Item: { // Creating an Item with a unique id and with the passed title
      id: generateUUID(),
      title: title,
      band: band,
      album: album
    }
  };
  try {
    // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200,
      body: data
    };
    return response; // Returning a 200 if the item has been inserted 
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};
