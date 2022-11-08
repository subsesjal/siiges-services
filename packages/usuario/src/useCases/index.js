const updateUserInfo = require('./update-user-info.use-cases');
const person = require('./persona');
const usuario = require('./usuario');

module.exports = {
  person,
  updateUserInfo,
  ...usuario,
};
