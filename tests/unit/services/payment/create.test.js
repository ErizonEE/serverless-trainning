const { create } = require('../../../../services/payment.service');

describe('Create payment test suit case', () => {
    test('Correct creation', () => {
        // Config
        const data = {};
    
        // Calls
        const res = create(data);
        
        // Asserts
        expect(res).toBe(undefined);
    });
});