const { validate } = require("./Validator.js");
const { create } = require("./ClientService.js");

module.exports.handler = async (event) => {
  const body = event;
  const validationResult = validate(body);
  
  if (validationResult.isValid === false) {
      return {
        statusCode: 400,
        body: validationResult.message
      };
  }
  
  try {
    await create(body);
  }
  catch(error) {
    console.log(error);
    
    return {
      statusCode: 500,
      body: JSON.stringify("Ups!. Something went wrong.")
    };
  }

  return {
    statusCode: 201,
    body: "Client created",
  };
};