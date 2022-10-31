const { InputValidation } = require('ebased/schema/inputValidation');

class CreateClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CREATED',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      schema: {
        strict: false,
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        dni: { type: String, required: true },
        birthday: { type: String, required: true }
      },
    })
  }
}

module.exports = { CreateClientValidation };
