const { solicitudBeca } = require('./properties/solicitudBeca');
const { estatusSolicitudBeca } = require('./properties/estatusSolcitudBeca');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { responseProperties } = require('./properties/responseProperties');

const updateSolicitudBecaSchema = {
  tags: ['Solicitudes Becas'],
  description: 'Actualizar una solicitud de beca a través del id de la solicitud.',
  params: {
    title: 'updateSolcitudSeccionObservacionSchema.',
    type: 'object',
    properties: {
      solicitudBecaId: { type: 'integer' },
    },
    required: ['solicitudBecaId'],
  },
  body: {
    type: 'object',
    properties: { ...solicitudBeca },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
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
            programa: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...programa,
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
          },
        },
      },
    },
  },
};

module.exports = { updateSolicitudBecaSchema };
