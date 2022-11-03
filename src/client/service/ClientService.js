const dynamo = require('ebased/service/storage/dynamo');
const { CLIENT_TABLE } = process.env;

const { ClientCreatedEvent } = require('../schema/event/clientCreatedEvent');
const { ClientUpdatedEvent } = require('../schema/event/clientUpdatedEvent');
const sns = require('ebased/service/downstream/sns');
const { CLIENT_CREATED_TOPIC_ARN, CLIENT_UPDATED_TOPIC_ARN } = process.env;

const create = async (newClient) => {
  const client = await dynamo.putItem({
    TableName: CLIENT_TABLE,
    Item: newClient,
  });

  return client.Item;
};

const show = async (clientId) => {
  const { Item } = await dynamo.getItem({
    TableName: CLIENT_TABLE,
    Key: { dni: clientId },
  });

  return Item;
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

/**
 * @param { ClientUpdatedEvent } clientUpdatedEvent 
 */
const emitClientUpdated = async (oldClient, newClient) => {
  console.info('emitting client updated .....');

  const snsPublishParams = {
    TopicArn: CLIENT_UPDATED_TOPIC_ARN,
    Message: { oldClient, newClient },
  };

  await sns.publish(snsPublishParams, {});
}

const index = async () => {
  return (await dynamo.scanTable({ TableName: CLIENT_TABLE })).Items;
};

module.exports = { index, create, show, emitClientCreated, emitClientUpdated }