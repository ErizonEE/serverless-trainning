const { InputValidation } = require('ebased/schema/inputValidation');

class UpdateClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.UPDATE',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      schema: {
        strict: true,
        enable: { type: Boolean, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        dni: { type: String, required: true },
        birthday: { type: String, required: true }
      },
    })
  }
}

module.exports = { UpdateClientValidation };
