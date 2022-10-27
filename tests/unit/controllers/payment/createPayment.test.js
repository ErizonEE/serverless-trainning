const { createPayment } = require('../../../../controllers/payment.controller');

jest.mock('../../../../services/payment.service');
const { validate } = require('../../../../services/payment.service');
const { create } = require('../../../../services/payment.service');

describe('Creation test suit case', () => {

    beforeEach(() => {
        jest.clearAllMocks();
      });

    test('Success creation', () => {
        // Config
        const data = { value: 1 };
    
        // Calls
        createPayment(data);
        
        // Asserts
        expect(validate).toHaveBeenNthCalledWith(1, data);
        expect(create).toHaveBeenNthCalledWith(1, data);
    });

    test('handle validation exception correctly', () => {
        // Config
        const data = { exception: true };
        validate.mockImplementation(() => {
            throw new Error();
          });
    
        // Calls
        const res = createPayment(data);
        
        // Asserts
        expect(create).toHaveBeenCalledTimes(0);
        expect(res).toStrictEqual("Ups. something went wrong. Here handle exception correctly");
    });
});