const dynamo = require('ebased/service/storage/dynamo');

const { CLIENT_TABLE } = process.env;

function update(clientId, updateParams) {
    const Key = { dni: clientId };
    const updateExpressions = [];
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};

    Object.keys(updateParams).forEach((property) => {
        if (updateParams[property] === undefined) return;
        updateExpressions.push(`#${property}=:${property}`);
        ExpressionAttributeNames[`#${property}`] = property;
        ExpressionAttributeValues[`:${property}`] = updateParams[property];
    });
    if (!updateExpressions.length) {
        throw new Error('Nothing to update');
    }
    const UpdateExpression = `SET ${updateExpressions.join(', ')}`;

    const params = {
        TableName: CLIENT_TABLE,
        Key,
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    };

    return dynamo.updateItem(params);
  }

  module.exports = { update };