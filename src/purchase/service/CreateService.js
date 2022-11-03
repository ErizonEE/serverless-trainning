const dynamo = require('ebased/service/storage/dynamo');
const { PURCHASE_TABLE } = process.env;

const create = async (newPurchase) => {
    const purchase = await dynamo.putItem({
      TableName: PURCHASE_TABLE,
      Item: newPurchase,
    });
  
    return purchase.Item;
};

module.exports = { create };