const sendNotificationEmail = require('./send.notification-email.use-cases');
const db = require('./db');

module.exports = {
  sendNotificationEmail,
  ...db,
};
