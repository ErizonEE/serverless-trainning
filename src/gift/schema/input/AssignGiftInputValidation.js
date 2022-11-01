const { InputValidation } = require('ebased/schema/inputValidation');
  
class AssignGiftInputValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'GIFT.ASSIGN_CLIENT_GIFT',
      specversion: 'v1.0.0',
      source: meta.source,
      payload,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        birthday: { type: String, required: true } // TODO: CHECK WITH Date
      },
    });
  }
}

module.exports = { AssignGiftInputValidation };