const DYNAMODB = require("aws-sdk/clients/dynamodb");

const TYPE_CLASSIC = 'Classic';
const TYPE_GOLDEN = 'Golden';

const dynamodb = new DYNAMODB({
  region: process.env.DEFAULT_REGION,
});

const createAndAssign = async (client) => {
  const clientCard = create(client);

  await save(client, clientCard);
  
  return clientCard;
};

function create(client){
  const currentDate = new Date();
  currentDate.setFullYear( currentDate.getFullYear() + 3);

  return {
    type: getTypeForCreation(client),
    securityCode: generateSecurityCode(),
    number: generateNumber(),
    expirationDate: currentDate.toLocaleDateString('es-LA'),
  }
}

async function save(client, clientCard) {
  const dbParams = {
    ExpressionAttributeNames: {
      "#C": "creditCard",
    },
    ExpressionAttributeValues: {
      ":c": {
        M: {
          "number": {
            S: clientCard.number,
          },
          "expiration": {
            S: clientCard.expirationDate,
          },
          "ccv": {
            S: clientCard.securityCode,
          },
          "type":{
            S: clientCard.type
          }
        },
      },
    },
    Key: {
      dni: {
        N: client.dni,
      },
    },
    ReturnValues: "ALL_NEW",
    TableName: process.env.CLIENT_TABLE,
    UpdateExpression: "SET #C = :c",
  };

  const dbResult = await dynamodb.updateItem(dbParams).promise();
  console.info(dbResult);

  return dbResult;
}

function getTypeForCreation(client) {
  const clientAge = calculateAge(client.birthday);

  if(clientAge > 65) return TYPE_GOLDEN;
  else return TYPE_CLASSIC;
}

function calculateAge(birthday) {
  const birthdayObj = new Date(birthday);
  const dateDiffInMs = Date.now() - birthdayObj.getTime();
  const dateDiffObj = new Date(dateDiffInMs);

  return Math.abs(dateDiffObj.getUTCFullYear() - 1970);
}

function generateSecurityCode() {
  return generateRandomNumber(100, 999).toString();
}

function generateNumber() {
  return generateRandomNumber(4000000000000000, 4999999999999999).toString();
}

function generateRandomNumber(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}

module.exports = { createAndAssign };