const { ratificacionNombre } = require('./properties/ratificacionNombre');
const { responseProperties } = require('./properties/responseProperties');

const deleteInstitucionSchema = {
  tags: ['Institucion'],
  description: 'Given a ratificacion id and a institucion id, then delete the ratificacion of institucion in database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
      ratificacionId: { type: 'integer' },
    },
    required: ['institucionId', 'ratificacionId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...ratificacionNombre,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = deleteInstitucionSchema;
