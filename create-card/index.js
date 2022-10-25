const { transformSqsMessages } = require("./Utils");
const { createAndAssign } = require("./CardService");

module.exports.handler = async (event) => {
  const clientsCreated = transformSqsMessages(event);

  try {
    for await (const client of clientsCreated) {
      await createAndAssign(client);
    }
  } catch (e) {
    console.error("Err assign card: ", e);
    
    return {
      statusCode: 500,
      body: "Ups. Something was wrong."
    }
  }

  return {
    statusCode: 201,
    body: "Cards created succesfully",
  };
};