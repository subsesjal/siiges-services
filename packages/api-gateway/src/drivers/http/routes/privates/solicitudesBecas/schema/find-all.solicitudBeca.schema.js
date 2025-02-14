const { solicitudBeca } = require('./properties/solicitudBeca');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { responseProperties } = require('./properties/responseProperties');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { estatusSolicitudBeca } = require('./properties/estatusSolcitudBeca');

const findAllSolicitudBecaSchema = {
  tags: ['Solicitudes Becas'],
  description: 'Given an object with solicitud becas',
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            folioSolicitud: { type: 'string' },
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
};

module.exports = findAllSolicitudBecaSchema;
