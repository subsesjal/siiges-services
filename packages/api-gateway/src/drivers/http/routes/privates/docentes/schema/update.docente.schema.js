const { docente } = require('./properties/docente');
const { responseProperties } = require('./properties/responseProperties');
const { persona } = require('../../usuarios/schema/properties/persona');
const { asignaturaDocente } = require('./properties/asignaturaDocente');
const { asignatura } = require('../../asignaturas/schema/properties/asignatura');
const { formacion } = require('./properties/formacion');
const { formacionDocente } = require('./properties/formacionDocente');

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
      formacionesDocentes: {
        type: 'array',
        items: {
          type: 'object',
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
            formacionesDocentes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...formacionDocente,
                  ...responseProperties,
                  formacion: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...formacion,
                      ...responseProperties,
                    },
                  },
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

module.exports = updateDocenteSchema;
