const { solicitudBeca } = require('./properties/solicitudBeca');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { responseProperties } = require('./properties/responseProperties');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { estatusSolicitudBeca } = require('./properties/estatusSolcitudBeca');

const findAllSolicitudesBecaSchema = {
  tags: ['Solicitudes Becas'],
  description: 'Este endpoint devuelve un arreglo de objetos, donde cada objeto contiene los detalles de una solicitud de beca, incluyendo su estatus, ciclo escolar y programa asociado.',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array', // Cambiado a "array" porque es una lista de solicitudes
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...solicitudBeca,
              ...responseProperties,
              estatusSolicitudBeca: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...estatusSolicitudBeca,
                  ...responseProperties,
                },
              },
              cicloEscolar: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...cicloEscolar,
                  ...responseProperties,
                },
              },
              programa: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...programa,
                  ...responseProperties,
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findAllSolicitudesBecaSchema;
