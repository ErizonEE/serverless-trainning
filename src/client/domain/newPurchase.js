const { NewClientPurchaseValidation } = require('../schema/input/NewPurchaseValidation');

const { show } = require('../service/ClientService');
const { updatePoint } = require('../service/UpdatePointService');

function calculateNewPoints(products) {
    return products.map(product => Math.trunc(product.finalPrice / 200)).reduce((preV, curV) => preV + curV, 0);
}

module.exports = async (commandPayload, commandMeta) => {
    // Input validation
    new NewClientPurchaseValidation(commandPayload, commandMeta);

    const client = await show(commandPayload.clientId);

    let points = client.points || 0;

    points = points + calculateNewPoints(commandPayload.products);

    // Service calls
    await updatePoint(client.dni, points);

    // Response
    return { body: points };
};
