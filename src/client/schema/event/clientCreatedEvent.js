const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class ClientCreatedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CREATED',
      specversion: 'v1.0.0',
      payload: payload,
      meta: meta,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        birthday: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true }
      },
    })
  }
}

module.exports = { ClientCreatedEvent };