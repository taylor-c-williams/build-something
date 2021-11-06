const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const BaselineTest = require('../lib/models/BaselineTest');
const BaselineTestService = require('../lib/services/BaselineTestService');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('Services Tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    return await BaselineTest.register(12345678, true);
  });

  // Create User
  it('Adds a new replicant to the database', async () => {
    const newUser = await BaselineTestService.createUser(23456789, false);
    const registeredUser = await BaselineTest.getId(newUser.id);
    expect([newUser]).toEqual(registeredUser);
  });
  // // UPDATE Order
  // it('Updates an order in the DB and sends a confirmation text message', async () => {
  //   const order = await Order.insert(2);
  //   const updatedOrder = await updateOrder(order.id, 4);
  //   expect(updatedOrder).toEqual({ id: '2', quantity: 4 });
  // });

  // // DELETE Order
  // it('Deletes an order in the DB and sends a confirmation text message', async () => {
  //   const mockOrder = Order.insert(27);
  //   return deleteOrder(2).then(() => {
  //     expect(mockOrder).toBeNull;
  //   });
  // });
});
