const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const BaselineTest = require('../lib/models/BaselineTest');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('orders.js routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    return await BaselineTest.register(10234567, true);
  });

  // POST Route
  it('tests the POST route', async () => {
    return request(app)
      .post('/api/replicants')
      .send({ contact: '12345678', passing: true })
      .then((res) => {
        expect(res.body).toEqual({
          contact: '12345678',
          passing: true,
          id: '2',
        });
      });
  });

  // GET ALL Users
  it('Responds with an array of all registered replicants', async () => {
    await request(app)
      .post('/api/replicants')
      .send({ contact: '12345678', passing: true });
    return await request(app)
      .get('/api/replicants')
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              id: '1',
              contact: '10234567',
              passing: true,
            },
            {
              id: '2',
              contact: '12345678',
              passing: true,
            },
          ])
        );
      });
  });

  // GET user by ID
  it('Responds with a replicant object with the given ID', async () => {
    return await request(app)
      .get('/api/replicants/1')
      .then((req) => {
        expect(req.body).toEqual([
          { id: '1', contact: '10234567', passing: true },
        ]);
      });
  });

  // // Patch by ID
  // it('Updates an order in the DB and sends a confirmation text message', async () => {
  //   return await request(app)
  //     .patch('/api/v1/orders/1')
  //     .send({ quantity: 100 })
  //     .then((res) => {
  //       expect(res.body).toEqual({
  //         id: '1',
  //         quantity: 100,
  //       });
  //     });
  // });

  // // Deletes by ID
  // it('Deletes an order in the DB and sends a confirmation text message', async () => {
  //   return await request(app)
  //     .delete('/api/v1/orders/1')
  //     .then((res) => {
  //       expect(res.status).toEqual(204);
  //     });
  // });
});
