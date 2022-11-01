const { batchEventMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/batchEventQueue');
const outputMode = require('ebased/handler/output/batchEventConfirmation');

const assignGiftDomain = require('../domain/assign');

module.exports.handler = async (command, context) => {
  return batchEventMapper(
    { events: command, context },
    inputMode,
    assignGiftDomain,
    outputMode
  );
};
