const { validate } = require('../../../../services/payment.service');

describe('Validation payment test suit case', () => {
    test('Correct validation', () => {
        // Config
        const data = {};
    
        // Calls
        const res = validate(data);
        
        // Asserts
        expect(res).toBe(undefined);
    });

    test('Throw exception when validation fail', () => {
        // Config
        const data = { exception: true };

        // Calls
        const res = () => validate(data);
        
        // Asserts
        expect(res).toThrowError();
    });
});