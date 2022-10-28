const DYNAMODB = require("aws-sdk/clients/dynamodb");
const SNS = require("aws-sdk/clients/sns");

const sns = new SNS({
  region: process.env.DEFAULT_REGION,
});
    
const dynamodb = new DYNAMODB({
  region: process.env.DEFAULT_REGION,
});

const create = async (newClient) => {
  const dbParams = {
    Item: {
      dni: {
        S: newClient.dni.toString(),
      },
      name: {
        S: newClient.name,
      },
      lastName: {
        S: newClient.lastName,
      },
      birth: {
        S: newClient.birthday,
      },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: process.env.CLIENT_TABLE,
  };

  const snsParams = {
    Message: JSON.stringify(newClient),
    TopicArn: process.env.CLIENT_CREATED_TOPIC_ARN,
  };

  const dbResult = await dynamodb.putItem(dbParams).promise();
  console.info(dbResult);
  const snsResult = await sns.publish(snsParams).promise();
  console.info(snsResult);
}

module.exports = { create }