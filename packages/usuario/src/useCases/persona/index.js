const { persona } = require('../../adapters/db');
const update = require('./update.persona.use-cases');

module.exports = {
  update: update(persona.updateQuery),
};
