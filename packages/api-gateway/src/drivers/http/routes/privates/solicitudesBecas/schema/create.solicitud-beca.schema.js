const { solicitudBeca } = require('./properties/solicitudBeca');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudBecaSchema = {
  tags: ['Solicitudes Becas'],
  description: 'Given an object with solicitud Beca required data, then save the first time a new solicitud in database.',
  body: {
    type: 'object',
    properties: { ...solicitudBeca },
    required: ['estatusSolicitudBecaId', 'programaId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            BecaSolicitud: { type: 'string' },
            ...solicitudBeca,
            ...responseProperties,
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

module.exports = createSolicitudBecaSchema;
