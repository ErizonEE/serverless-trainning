const { getSummary } = require('../../../../controllers/payment.controller');

jest.mock('../../../../services/payment.service');
const { getPayments } = require('../../../../services/payment.service');

describe('Get Summary payment data test suit case', () => {

    beforeEach(() => {
        jest.clearAllMocks();
      });

    test('Get total and amount success', () => {
        // Config
        const payments = [
            {
                "id": "4f3fe4eb-6afc-4d7b-b630-10b09177b48d",
                "amount": 200,
                "description": "product description",
                "payment_gateway": "naranja",
                "pan": "************1538"
            },
            {
                "id": "05ea4157-d742-487b-9f49-47b320a723f9",
                "amount": 500,
                "description": "product description",
                "payment_gateway": "visa",
                "pan": "************4165"
            }
        ];
        getPayments.mockReturnValue(payments);
    
        // Calls
        const res = getSummary();
        
        // Asserts
        expect(res).toStrictEqual({ total: 700, count: 2});
    });

    test('Get total and amount success when there are not registers', () => {
        // Config
        getPayments.mockReturnValue([]);
    
        // Calls
        const res = getSummary();
        
        // Asserts
        expect(res).toStrictEqual({ total: 0, count: 0});
    });
});