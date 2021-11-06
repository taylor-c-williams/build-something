// const twilio = require('twilio');

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const sendSms = (to, message) => {
//   return twilioClient.messages.create({
//     body: message,
//     from: process.env.TWILIO_NUMBER,
//     to,
//   });
// };

// module.exports = { sendSms };

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: process.env.TWILIO_NUMBER,
    to: process.env.REPLICANT_HANDLER_NUMBER,
  })
  .then((message) => console.log(message.sid));
