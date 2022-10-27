const { getPaymentById } = require('../../../../controllers/payment.controller');

jest.mock('../../../../services/payment.service');
const { getPayments } = require('../../../../services/payment.service');

describe('Get payment by id test suit case', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });


    test('Find one specific payment', () => {
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
        const paymentId = "4f3fe4eb-6afc-4d7b-b630-10b09177b48d";
    
        // Calls
        const res = getPaymentById(paymentId);
        
        // Asserts
        expect(res).toBe(payments[0]);
    });

    test('Return undefined when not found payment', () => {
        // Config
        getPayments.mockReturnValue([]);
        const paymentId = "4f3fe4eb-6afc-4d7b-b630-10b09177b48d";

        // Calls
        const res = getPaymentById(paymentId);
        
        // Asserts
        expect(res).toBe(undefined);
    });
});