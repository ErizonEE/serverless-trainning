const { ErrorHandled } = require('ebased/util/error');
const { UpdateClientValidation } = require('../schema/input/UpdateClientValidation');
const { show } = require('../service/ClientService');
const { update } = require('../service/UpdateService');

const { BirthdayChangedEvent } = require('../schema/event/birthdayChangedEvent');
const { propagateBirthdayChanged } = require('../service/BirthdayChangedService');

module.exports = async (commandPayload, commandMeta) => {
    // Input validation
    new UpdateClientValidation(commandPayload, commandMeta);

    const params = {
        enable: commandPayload.enable, // TODO: fix
        name: commandPayload.name,
        lastName: commandPayload.lastName,
        birthday: commandPayload.birthday
    }

    // Service calls
    const client = await show(commandPayload.dni);

    if(!client) {
        throw new ErrorHandled('Resource Not Found', { status: 404 });
    }

    const updatedProperties = (await update(commandPayload.dni, params)).Attributes;

    if (client.birthday != updatedProperties.birthday) {
        await propagateBirthdayChanged(new BirthdayChangedEvent({ dni: client.dni, ...updatedProperties }, commandMeta))
    }

    // Response
    return { body: updatedProperties };
};
