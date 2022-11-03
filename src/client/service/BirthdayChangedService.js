const sns = require('ebased/service/downstream/sns');
const { CLIENT_BIRTHDAY_UPDATED_TOPIC_ARN } = process.env;

const { BirthdayChangedEvent } = require('../schema/event/birthdayChangedEvent');

/**
 * 
 * @param { BirthdayChangedEvent } event 
 */
async function propagateBirthdayChanged(event) {
  const { eventPayload, eventMeta } = event.get();

  const snsPublishParams = {
    TopicArn: CLIENT_BIRTHDAY_UPDATED_TOPIC_ARN,
    Message: eventPayload,
  };

  await sns.publish(snsPublishParams, eventMeta);
}

  module.exports = { propagateBirthdayChanged };