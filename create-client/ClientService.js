const DYNAMODB = require("aws-sdk/clients/dynamodb");
const SNS = require("aws-sdk/clients/sns");

const sns = new SNS({
  region: process.env.DEFAULT_REGION,
});
    
const dynamodb = new DYNAMODB({
  region: process.env.DEFAULT_REGION,
});

const create = async (body) => {
  const dbParams = {
    Item: {
      dni: {
        N: body.dni,
      },
      name: {
        S: body.name,
      },
      lastName: {
        S: body.lastName,
      },
      birth: {
        S: body.birthday,
      },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: process.env.CLIENT_TABLE,
  };

  const snsParams = {
    Message: JSON.stringify(body),
    TopicArn: process.env.CLIENT_CREATED_TOPIC_ARN,
  };

  const dbResult = await dynamodb.putItem(dbParams).promise();
  console.info(dbResult);
  const snsResult = await sns.publish(snsParams).promise();
  console.info(snsResult);
}

module.exports = { create }