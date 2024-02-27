const { docente } = require('./properties/docente');
const { responseProperties } = require('./properties/responseProperties');
const { persona } = require('../../usuarios/schema/properties/persona');
const { asignaturaDocente } = require('./properties/asignaturaDocente');
const { formacion } = require('./properties/formacion');

const { personaId: _, ...docenteBody } = docente;
const { id: __, domicilioId, ...personaBody } = persona;

const updateDocenteSchema = {
  tags: ['Docentes'],
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
      ...docenteBody,
      persona: {
        type: 'object',
        properties: {
          ...personaBody,
        },
      },
      formacionesDocente: {
        type: 'array',
        items: {
          properties: {
            id: { type: 'integer' },
            ...formacion,
          },
        },
      },
      asignaturasDocentes: {
        type: 'array',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['programaId'],
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
