const DYNAMODB = require("aws-sdk/clients/dynamodb");

const TYPE_CLASSIC = 'Classic';
const TYPE_GOLDEN = 'Golden';

const dynamodb = new DYNAMODB({
  region: process.env.DEFAULT_REGION,
});

const createAndAssign = async (client) => {
  const clientCard = create(client);
  console.info('Card created');

  await save(client, clientCard);

  console.info('Persisted card');
  
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
            S: clientCard.number.toString(),
          },
          "expiration": {
            S: clientCard.expirationDate,
          },
          "securityCode": {
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
        S: client.dni.toString(),
      },
    },
    ReturnValues: "ALL_NEW",
    TableName: process.env.CLIENT_TABLE,
    UpdateExpression: "SET #C = :c",
  };
  
  return dynamodb.updateItem(dbParams).promise();
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
  return generateRandomNumber(4000000000000000, 4999999999999999);
}

function generateRandomNumber(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}

module.exports = { createAndAssign };