const { docente } = require('./properties/docente');
const { asignaturaDocente } = require('./properties/asignaturaDocente');
const { asignatura } = require('../../asignaturas/schema/properties/asignatura');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const deleteDocenteSchema = {
  tags: ['Docentes'],
  description: 'Given a docente id, then delete a docente from database.',
  params: {
    type: 'object',
    properties: { docenteId: { type: 'integer' } },
    required: ['docenteId'],
  },
  response: {
    200: {
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
                  asignatura: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...asignatura,
                      ...responseProperties,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = deleteDocenteSchema;
