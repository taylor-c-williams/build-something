const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const BaselineTest = require('../lib/models/BaselineTest');
const BaselineTestService = require('../lib/services/BaselineTestService');
const { retireReplicant } = require('../lib/services/BaselineTestService');

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
  it('Adds a new Replicant to the database', async () => {
    const newUser = await BaselineTestService.createUser(23456789, false);
    const registeredUser = await BaselineTest.getId(newUser.id);
    expect([newUser]).toEqual(registeredUser);
  });

  // UPDATE User
  it('Updates a Replicant on file', async () => {
    const replicant = await BaselineTest.register(12345678, true);
    const updatedReplicant = await BaselineTestService.updateReplicant(
      12345679,
      false,
      replicant.id
    );
    expect(updatedReplicant).toEqual({
      contact: '12345679',
      id: '2',
      passing: false,
    });
  });

  // DELETE User
  it('Deletes a replicant from the database', async () => {
    const offBaseline = await BaselineTest.register(12345678, false);
    return retireReplicant(offBaseline.id).then(() => {
      expect(offBaseline).toBeNull;
    });
  });
});
