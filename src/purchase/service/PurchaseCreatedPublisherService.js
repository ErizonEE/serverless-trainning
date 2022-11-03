const sns = require('ebased/service/downstream/sns');

const { PurchaseCreatedEvent } = require('../schema/event/PurchaseCreatedEvent');
const { PURCHASE_CREATED_TOPIC_ARN } = process.env;

/**
 * @param {PurchaseCreatedEvent} newPurchaseEvent 
 */
 const emitPurchaseCreated = async (newPurchaseEvent, rawData) => {
    const { eventPayload, eventMeta } = newPurchaseEvent.get();

    const snsPublishParams = {
      TopicArn: PURCHASE_CREATED_TOPIC_ARN,
      Message: rawData,
    };
  
    await sns.publish(snsPublishParams, eventMeta);
  };

  module.exports = { emitPurchaseCreated }