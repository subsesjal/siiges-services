const updateUserDetail = require('./update-user-detail.use-cases');
const person = require('./persona');
const usuario = require('./usuario');

module.exports = {
  person,
  updateUserDetail,
  ...usuario,
};
