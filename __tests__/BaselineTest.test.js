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

  // GET ALL
  it('gets all replicants on file', async () => {
    const o1 = await BaselineTest.register(12345678, true);
    const o2 = await BaselineTest.register(23456789, true);
    const o3 = await BaselineTest.register(34567891, false);

    const replicants = await BaselineTest.getAll();
    expect(replicants).toEqual(expect.arrayContaining([o1, o2, o3]));
  });

  // UPDATE by ID
  it('updates the status of a registered replicant', async () => {
    const test = await BaselineTest.register(12345678, true);
    const update = await BaselineTest.update(56789012, false, test.id);
    expect(update).toEqual({ contact: '56789012', id: '2', passing: false });
  });

  // Delete by ID
  it('returns the deleted replicant', async () => {
    const test = await BaselineTest.register(12345678, false);
    await BaselineTest.delete(test.id);
    const replicants = await BaselineTest.getAll();
    expect(replicants).toEqual(
      expect.not.objectContaining({ contact: '12345678' })
    );
  });
});
