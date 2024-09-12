const { infraestructura } = require('./properties/infraestructura');
const { asignaturaInfraestructura } = require('./properties/asignaturaInfraestructura');
const { asignatura } = require('../../asignaturas/schema/properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const findGroupPlantelInfraestructuraSchema = {
  tags: ['Plantel'],
  description: 'Given the ID of plantel, then return the list of Infraestructura.',
  params: {
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
    },
    required: ['plantelId', 'programaId'],
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
            },
          },
        },
      },
    },
  },
};

module.exports = findGroupPlantelInfraestructuraSchema;
