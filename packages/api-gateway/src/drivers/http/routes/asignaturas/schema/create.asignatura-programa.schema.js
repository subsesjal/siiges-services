const { asignatura } = require('./properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudProgramaSchema = {
  tags: ['Solicitudes'],
  description:
    'Given an object with solicitud and programa required data, then save the first time a new solicitud in database.',
  body: {
    type: 'object',
    properties: {
      ...asignatura,
      required: ['cicloId', 'nivelId', 'modalidadId', 'plantelId'],
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            ...asignatura,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createSolicitudProgramaSchema;
