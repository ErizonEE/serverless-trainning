const { createPayment } = require('../../../../controllers/payment.controller');

jest.mock('../../../../services/payment.service');
const { validate } = require('../../../../services/payment.service');
const { create } = require('../../../../services/payment.service');

describe('Creation test suit case', () => {
    test('Success creation', () => {
        // Config
        const data = { value: 1 };

        validate.mockReturnValue(true);

        // Calls
        createPayment(data);
        
        // Asserts
        expect(validate).toHaveBeenCalledTimes(1);
        expect(create).toHaveBeenCalledTimes(1);
    });
});