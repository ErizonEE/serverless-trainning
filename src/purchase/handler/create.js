const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const create = require('../domain/create');

module.exports.handler = async (command, context) => {
  return commandMapper(
    {command, context},
    inputMode,
    create,
    outputMode
  );
};
