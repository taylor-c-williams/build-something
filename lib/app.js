const express = require('express');
const app = express();
const twilio = require('twilio');

app.use(express.json());
app.use('/api/replicants', require('./controllers/baselineTests.js'));
app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
