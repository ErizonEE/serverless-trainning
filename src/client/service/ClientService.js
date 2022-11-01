const dynamo = require('ebased/service/storage/dynamo');
const { CLIENT_TABLE } = process.env;

const { ClientCreatedEvent } = require('../schema/event/clientCreatedEvent');
const sns = require('ebased/service/downstream/sns');
const { CLIENT_CREATED_TOPIC_ARN } = process.env;

const create = async (newClient) => {
  const client = await dynamo.putItem({
    TableName: CLIENT_TABLE,
    Item: newClient,
  });

  return client.Item;
};

/**
 * @param {ClientCreatedEvent} newClientEvent 
 */
const emitClientCreated = async (newClientEvent) => {
  const { eventPayload, eventMeta } = newClientEvent.get();
  const snsPublishParams = {
    TopicArn: CLIENT_CREATED_TOPIC_ARN,
    Message: eventPayload,
  };

  await sns.publish(snsPublishParams, eventMeta);
};


const index = async () => {
  return (await dynamo.scanTable({ TableName: CLIENT_TABLE })).Items;
};

module.exports = { create, emitClientCreated, index }