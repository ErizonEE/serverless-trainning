const uuid = require('uuid');
const { ClientCreatedEvent } = require('../schema/event/clientCreatedEvent');
const { CreateClientValidation } = require('../schema/input/CreateClientValidation');

const ClientService = require('../service/ClientService');

module.exports = async (commandPayload, commandMeta) => {
    // Input validation
    new CreateClientValidation(commandPayload, commandMeta);

    commandPayload.uuid = uuid.v4();
    commandPayload.enable = true;

    // Service calls
    const clientCreated = await ClientService.create(commandPayload);
    await ClientService.emitClientCreated(new ClientCreatedEvent(clientCreated, commandMeta));

    // Response
    return { body: clientCreated };
};
