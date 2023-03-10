const { diligence, diligenceResponse } = require('./diligence.properties.schema');
const persona = require('../../../solicitudes/representantes/schemas/properties/persona.properties');

module.exports = {
  diligence,
  diligenceResponse,
  ...persona,
};
