const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
// const request = require('supertest');
// const app = require('../lib/app');
const BaselineTest = require('../lib/models/BaselineTest.js');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('BaselineTest class tests', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    return await BaselineTest.register(
      process.env.REPLICANT_HANDLER_NUMBER,
      true
    );
  });

  // GET by ID
  it('gets one registered replicant by id', async () => {
    const expected = await BaselineTest.register(15038208075, true);
    const actual = await BaselineTest.getId(2);
    expect(actual).toEqual(expect.arrayContaining([expected]));
  });

  // // GET ALL
  // it('gets all orders', async () => {
  //   const o1 = await Order.insert(1);
  //   const o2 = await Order.insert(2);
  //   const o3 = await Order.insert(3);

  //   const orders = await Order.getAll();
  //   expect(orders).toEqual(expect.arrayContaining([o1, o2, o3]));
  // });

  // // UPDATE by ID
  // it('updates the quantity of an order', async () => {
  //   const testOrder = await Order.insert(1);
  //   const order = await Order.update(testOrder.id, 2);
  //   expect(order).toEqual({ id: '1', quantity: 2 });
  // });

  // // Delete by ID
  // it('returns the deleted order', async () => {
  //   const testOrder = await Order.insert(1);
  //   await Order.delete(testOrder.id);
  //   const orders = await Order.getAll();
  //   expect(orders).toEqual([]);
  // });
});
