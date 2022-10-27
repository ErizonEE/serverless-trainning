const { sortPaymentsByAmount } = require('../../../../controllers/payment.controller');

jest.mock('../../../../services/payment.service');
const { getPayments } = require('../../../../services/payment.service');

describe('Get sort payments data by amount data test suit case', () => {

    beforeEach(() => {
        jest.clearAllMocks();
      });

    test('Get asc', () => {
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
            },
            {
                "id": "6d1c821c-eda5-41ee-b3af-438aef5ce796",
                "amount": 250,
                "description": "product description",
                "payment_gateway": "naranja",
                "pan": "************4878"
            },
        ];
        const expectedResult = [
            {
                "id": "4f3fe4eb-6afc-4d7b-b630-10b09177b48d",
                "amount": 200,
                "description": "product description",
                "payment_gateway": "naranja",
                "pan": "************1538"
            },
            {
                "id": "6d1c821c-eda5-41ee-b3af-438aef5ce796",
                "amount": 250,
                "description": "product description",
                "payment_gateway": "naranja",
                "pan": "************4878"
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
        const res = sortPaymentsByAmount();
        
        // Asserts
        expect(res).toStrictEqual(expectedResult);
    });
    test('Get desc', () => {
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
            },
            {
                "id": "6d1c821c-eda5-41ee-b3af-438aef5ce796",
                "amount": 250,
                "description": "product description",
                "payment_gateway": "naranja",
                "pan": "************4878"
            },
        ];
        const expectedResult = [
            {
                "id": "05ea4157-d742-487b-9f49-47b320a723f9",
                "amount": 500,
                "description": "product description",
                "payment_gateway": "visa",
                "pan": "************4165"
            },
            {
                "id": "6d1c821c-eda5-41ee-b3af-438aef5ce796",
                "amount": 250,
                "description": "product description",
                "payment_gateway": "naranja",
                "pan": "************4878"
            },
            {
                "id": "4f3fe4eb-6afc-4d7b-b630-10b09177b48d",
                "amount": 200,
                "description": "product description",
                "payment_gateway": "naranja",
                "pan": "************1538"
            },
        ];
        getPayments.mockReturnValue(payments);
    
        // Calls
        const res = sortPaymentsByAmount(false);
        
        // Asserts
        expect(res).toStrictEqual(expectedResult);
    });

    test('Get success response when there are not registers', () => {
        // Config
        getPayments.mockReturnValue([]);
    
        // Calls
        const res = sortPaymentsByAmount();
        
        // Asserts
        expect(res).toStrictEqual([]);
    });
});