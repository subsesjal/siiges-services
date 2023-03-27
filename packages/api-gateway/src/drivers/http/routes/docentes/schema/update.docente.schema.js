const { docente } = require('./properties/docente');
const { responseProperties } = require('./properties/responseProperties');
const { persona } = require('../../usuarios/schema/properties/persona');
const { asignaturaDocente } = require('./properties/asignaturaDocente');

const updateDocenteSchema = {
  tags: ['docente'],
  description: 'docente',
  params: {
    type: 'object',
    properties: {
      docenteId: { type: 'integer' },
    },
    required: ['docenteId'],
  },
  body: {
    type: 'object',
    properties: {
      ...docente,
      persona: {
        type: 'object',
        properties: {
          ...persona,
        },
      },
    },
    required: ['programaId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...docente,
            ...responseProperties,
            persona: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...persona,
                ...responseProperties,
              },
            },
            asignaturasDocentes: {
              type: 'array',
              items: {
                properties: {
                  id: { type: 'integer' },
                  ...asignaturaDocente,
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

module.exports = updateDocenteSchema;
