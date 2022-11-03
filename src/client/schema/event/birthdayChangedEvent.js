const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class BirthdayChangedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.BIRTHDAY_CHANGED',
      specversion: 'v1.0.0',
      payload,
      meta,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        birthday: { type: String, required: true }
      },
    });
  }
}

module.exports = { BirthdayChangedEvent };
