const { CreateCardInputValidation } = require("../schema/input/CreateCardInputValidation");
const { createAndAssign } = require("../service/CardService");

module.exports = async (commandPayload, commandMeta) => {
  const payload = JSON.parse(commandPayload.Message);

  new CreateCardInputValidation(payload, commandMeta);

  const clientCard = await createAndAssign(payload);

  return { body: clientCard };
};