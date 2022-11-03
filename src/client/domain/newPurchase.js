const { NewClientPurchaseValidation } = require('../schema/input/NewPurchaseValidation');

const { show } = require('../service/ClientService');
const { updatePoint } = require('../service/UpdatePointService');

function calculateNewPoints(products) {
    return products.map(product => Match.trunc(product.finalPrice / 200)).reduce(preV, curV => preV + curV, 0);
}

module.exports = async (commandPayload, commandMeta) => {
    // Input validation
    new NewClientPurchaseValidation(commandPayload, commandMeta);

    const client = await show(commandPayload.clientId);

    let points = client.points || 0;

    points = points + calculateNewPoints(commandPayload.products);

    // Service calls
    // const clientCreated = await ClientService.create(commandPayload);
    // await ClientService.emitClientCreated(new ClientCreatedEvent(clientCreated, commandMeta));

    // Response
    return { body: points };
};
