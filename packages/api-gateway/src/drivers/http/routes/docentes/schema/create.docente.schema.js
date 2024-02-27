const { docente } = require('./properties/docente');
const { formacion } = require('./properties/formacion');
const { asignaturaDocente } = require('./properties/asignaturaDocente');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const createDocenteSchema = {
  tags: ['Docentes'],
  description:
    'Given an object with docente required data, then save the first time a new docente in database.',
  body: {
    type: 'object',
    properties: {
      ...docente,
      persona: {
        type: 'object',
        properties: {
          ...persona,
        },
        required: ['nombre', 'apellidoPaterno'],
      },
      formacionesDocente: {
        type: 'array',
        items: {
          properties: {
            ...formacion,
          },
        },
      },
      asignaturasDocentes: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'integer',
        },
      },
    },
    required: ['programaId', 'esAceptado', 'tipoDocente', 'tipoContratacion', 'persona', 'asignaturasDocentes'],
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
            formacionesDocente: {
              type: 'array',
              items: {
                properties: {
                  id: { type: 'integer' },
                  ...formacion,
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

module.exports = createDocenteSchema;
