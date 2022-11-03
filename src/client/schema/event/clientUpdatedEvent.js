const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class ClientUpdatedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.UPDATED',
      specversion: 'v1.0.0',
      payload: payload,
      meta: meta,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        enable: { type: Boolean, required: true },
        birthday: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true }
      },
    })
  }
}

module.exports = { ClientUpdatedEvent };