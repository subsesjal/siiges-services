const { higiene } = require('../../../adapters/db');
const updateHigiene = require('./update.higiene.use-cases');

module.exports = {
  updateHigiene: updateHigiene(
    higiene.updateHigieneQuery,
  ),
};
