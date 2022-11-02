const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const read = require('../domain/read');

module.exports.handler = async (command, context) => {
  return commandMapper(
    {command, context},
    inputMode,
    read,
    outputMode
  );
};
