const { transformSqsMessages } = require("./Utils");
const { createAndAssign } = require("./CardService");

module.exports.handler = async (event) => {
  const clientsCreated = transformSqsMessages(event);

  try {
    clientsCreated.forEach(async client => {
      await createAndAssign(client);
    });
  } catch (e) {
    console.log("Err assign card: ", e);
    
    return {
      statusCode: 500,
      body: "Ups. Something was wrong."
    }
  }

  return {
    statusCode: 200,
    body: "Cards created succesfully",
  };
};