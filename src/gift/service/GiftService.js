const DYNAMODB = require("aws-sdk/clients/dynamodb");

const dynamodb = new DYNAMODB({
  region: process.env.DEFAULT_REGION,
});


const SPRING_GIFT = 'camisa';
const SUMMER_GIFT = 'remera';
const AUTUM_GIFT = 'buzo';
const WINTER_GIFT = 'sweater';

const createAndAssign = async (client) => {
    const season = getSeason((new Date(client.birthday)).getMonth() + 1);
    let gift;

    switch(season) {
        case 'spring':
            gift = SPRING_GIFT;
            break;
        case 'winter':
            gift = WINTER_GIFT;
            break;
        case 'autum':
            gift = AUTUM_GIFT;
            break;
        default:
            gift = SUMMER_GIFT;
    }

    console.info('Gift assigned');
  
    await save(client.dni.toString(), gift);
  
    console.info('Persisted gift');
    
    return gift;
};

const getSeason = (month) => {
    if (3 >= month && month <= 5) {
        return 'autum';
    }
  
    if (6 >= month && month <= 8) {
      return 'winter';
    }

    if (9 >= month && month <= 11) {
      return 'spring';
    }

    return 'summer';
};

const save = async (clientId, gift) => {
    const dbParams = {
        ExpressionAttributeNames: {
          "#G": "gift",
        },
        ExpressionAttributeValues: {
          ":g": {
            S: gift,
          },
        },
        Key: {
          dni: {
            S: clientId,
          },
        },
        ReturnValues: "ALL_NEW",
        TableName: process.env.CLIENT_TABLE,
        UpdateExpression: "SET #G = :g",
      };
      
    return dynamodb.updateItem(dbParams).promise();
}

module.exports = { createAndAssign };