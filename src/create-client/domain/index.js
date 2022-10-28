// const { FaultHandled } = require('ebased/util/error');

const { CreateClientValidation } = require('../schema/input/CreateClientValidation');

const ClientService = require('../service/ClientService');

module.exports = async (commandPayload, commandMeta) => {
    console.info(commandPayload);
    // Input validation
    new CreateClientValidation(commandPayload, commandMeta);

    // Service calls
    await ClientService.create(commandPayload);

    return commandPayload;
};
