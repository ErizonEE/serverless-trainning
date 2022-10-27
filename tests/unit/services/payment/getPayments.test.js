const { getPayments } = require('../../../../services/payment.service');
const payments = require('../../../../model/payments.json')

describe('Get payments test suite case', () => {
    test('Correct get', () => {
        // Calls
        const res = getPayments();
        
        // Asserts
        expect(res).toStrictEqual(payments);
    });
});