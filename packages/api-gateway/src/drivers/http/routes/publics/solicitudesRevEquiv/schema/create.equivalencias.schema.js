const equivalenciaProperties = require('./properties/equivalenciaProperties');
const { responseProperties } = require('./properties/responseProperties');

const createEquivalenciaSchema = {
  type: 'object',
  properties: {
    ...equivalenciaProperties,
    ...responseProperties,
  },
  required: [
    'tipoTramiteId',
    'estatusSolicitud',
    'fecha',
    'observaciones',
    'interesado',
  ],
};

module.exports = {
  createEquivalenciaSchema,
};
