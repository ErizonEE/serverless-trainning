const { batchEventMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/batchEventQueue');
const outputMode = require('ebased/handler/output/batchEventConfirmation');

const createCardDomain = require('../domain/create');

module.exports.handler = async (command, context) => {
  console.log('en el handler viene: ', command);
  return batchEventMapper(
    { events: command, context },
    inputMode,
    createCardDomain,
    outputMode
  );
};
