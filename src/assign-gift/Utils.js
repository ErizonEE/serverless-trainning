module.exports.transformSqsMessages = (sqsMessages) => {
    const messages = sqsMessages.Records.map((e) => e.body);
  
    return messages.map((e) => JSON.parse(JSON.parse(e).Message));
}