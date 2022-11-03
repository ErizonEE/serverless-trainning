const DYNAMODB = require("aws-sdk/clients/dynamodb");

const dynamodb = new DYNAMODB({
  region: process.env.DEFAULT_REGION,
});

async function updatePoint(clientId, points) {
  const dbParams = {
    ExpressionAttributeNames: {
      "#P": "points",
    },
    ExpressionAttributeValues: {
      ":points": {
        S: points,
      },
    },
    Key: {
      dni: {
        S: clientId,
      },
    },
    ReturnValues: "ALL_NEW",
    TableName: process.env.CLIENT_TABLE,
    UpdateExpression: "SET #P = :points",
  };
  
  return dynamodb.updateItem(dbParams).promise();
}

module.exports = { updatePoint };