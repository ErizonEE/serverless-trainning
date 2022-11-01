
const ClientService = require('../service/ClientService');

module.exports = async (commandPayload, commandMeta) => {
    // Service calls
    const clients = await ClientService.index();

    // Response
    return { body: clients };
};
