const { diligence, diligenceResponse } = require('./diligence.properties.schema');
const persona = require('./persona.properties.schema');

module.exports = {
  diligence,
  diligenceResponse,
  ...persona,
};
