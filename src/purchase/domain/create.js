const { ErrorHandled } = require('ebased/util/error');
const uuid = require('uuid');

const { PurchaseCreatedEvent } = require('../schema/event/PurchaseCreatedEvent');
const { CreatePurchaseValidation } = require('../schema/input/CreatePurchaseValidation');

const { create } = require('../service/CreateService');
const { emitPurchaseCreated } = require('../service/PurchaseCreatedPublisherService');

const { show } = require('../../client/service/ClientService');
const { TYPE_CLASSIC, TYPE_GOLDEN } = require('../../card/service/CardService');

module.exports = async (commandPayload, commandMeta) => {
    // Input validation
    new CreatePurchaseValidation(commandPayload, commandMeta);

    const client = await show(commandPayload.clientId);

    if (!client || client.enable === false) {
        throw new ErrorHandled("Client Not Found", { status: 400 });
    }

    const purchase = {};
    purchase.uuid = uuid.v4();
    purchase.clientId = commandPayload.clientId;
    purchase.products = commandPayload.products.map(product => {
        let finalPrice;

        switch(client.creditCard.type) {
            case TYPE_CLASSIC:
                finalPrice = product.price * 0.92;
                break;
            case TYPE_GOLDEN:
                finalPrice = product.price * 0.88;
                break;
            default:
                finalPrice = product.price;
        }

        return { ...product, finalPrice };
    });

    purchase.uuid = uuid.v4();

    // Service calls
    const purchaseCreated = await create(purchase);
    console.log(purchaseCreated)
    await emitPurchaseCreated(new PurchaseCreatedEvent(purchaseCreated, commandMeta), purchaseCreated);

    // Response
    return { body: purchaseCreated };
};
