
const { ErrorHandled } = require('ebased/util/error');
const ClientService = require('../service/ClientService');

module.exports = async (commandPayload, commandMeta) => {
    // Service calls
    const client = await ClientService.show(commandPayload.id);

    console.log('client is: ', client);
    if(!client || client.enable === false) {
        throw new ErrorHandled('Resource Not Found', { code: 404 });
    }

    // Response
    return { body: client };
};
