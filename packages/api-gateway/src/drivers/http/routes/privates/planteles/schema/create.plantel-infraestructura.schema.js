const { infraestructura } = require('./properties/infraestructura');
const { asignaturaInfraestructura } = require('./properties/asignaturaInfraestructura');
const { infraestructuraPrograma } = require('./properties/infraestructuraPrograma');
const { responseProperties } = require('./properties/responseProperties');
const { asignatura } = require('../../asignaturas/schema/properties/asignatura');

const createPlantelInfraestructuraSchema = {
  tags: ['Plantel'],
  description: 'Given an object with plantel infraestructura required data, then save a record of infraestrucutra-plantel in database.',
  params: {
    title: 'createInfraestructuraSchema',
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
    },
    required: ['plantelId'],
  },
  body: {
    type: 'object',
    properties: {
      ...infraestructura,
      asignaturasInfraestructura: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'integer',
        },
      },
    },
    required: ['tipoInstalacionId', 'nombre', 'ubicacion', 'capacidad', 'metros'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...infraestructura,
            ...responseProperties,
            asignaturasInfraestructura: {
              type: 'array',
              items: {
                properties: {
                  id: { type: 'integer' },
                  ...asignaturaInfraestructura,
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
            infraestructuraPrograma: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...infraestructuraPrograma,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createPlantelInfraestructuraSchema;
