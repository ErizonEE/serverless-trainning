const { AssignGiftInputValidation } = require("../schema/input/AssignGiftInputValidation");
const { createAndAssign } = require("../service/GiftService");

module.exports = async (commandPayload, commandMeta) => {
  const payload = JSON.parse(commandPayload.Message);

  new AssignGiftInputValidation(payload, commandMeta);

  const clientCard = await createAndAssign(payload);

  return { body: clientCard };
};