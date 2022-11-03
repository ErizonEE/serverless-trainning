const { batchEventMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/batchEventQueue');
const outputMode = require('ebased/handler/output/batchEventConfirmation');

const newPurchase = require('../domain/newPurchase');

module.exports.handler = async (command, context) => {
  return batchEventMapper(
    { events: command, context },
    inputMode,
    newPurchase,
    outputMode
  );
};
