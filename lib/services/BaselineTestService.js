const BaselineTest = require('../models/BaselineTest');
const { sendSms } = require('../utils/twilio');

module.exports = class BaselineTestService {
  static async createUser(contact, passing) {
    await sendSms(
      process.env.REPLICANT_HANDLER_NUMBER,
      `New Replicant registered at ${contact}.
      Current Status: ${passing}`
    );
    const newUser = await BaselineTest.register(contact, passing);
    return newUser;
  }

  static async updateReplicant(contact, passing, id) {
    await sendSms(
      process.env.REPLICANT_HANDLER_NUMBER,
      `Replicant number ${id} file updated. New Status:  Contact:${contact}, Status: ${passing}`
    );
    const replicant = await BaselineTest.update(contact, passing, id);
    return replicant;
  }

  // static async deleteOrder(id) {
  //   await sendSms(
  //     process.env.REPLICANT_HANDLER_NUMBER,
  //     `Order number ${id} has been deleted.`
  //   );
  //   const order = await Order.delete(id);
  //   return order;
};
