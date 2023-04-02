const { docente } = require('./properties/docente');
const { asignaturaDocente } = require('./properties/asignaturaDocente');
const { asignatura } = require('../../asignaturas/schema/properties/asignatura');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const findGroupDocentesProgramaSchema = {
  tags: ['Docentes'],
  description: 'Given the ID of programa, then return the list of Docentes by Programa',
  params: {
    type: 'object',
    properties: { programaId: { type: 'integer' } },
    required: ['programaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
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
  },
};

module.exports = findGroupDocentesProgramaSchema;
