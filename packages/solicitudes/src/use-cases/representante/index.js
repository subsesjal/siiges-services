const db = require('./db');
const createWithCheck = require('./create-with-check.representante.use-cases');
const updateAndFind = require('./update-find.representante.use-cases');

module.exports = {
  ...db,
  createWithCheck,
  updateAndFind,
};
