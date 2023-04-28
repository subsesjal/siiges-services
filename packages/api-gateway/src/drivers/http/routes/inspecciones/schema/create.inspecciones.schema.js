const { inspecciones } = require('./properties/inspecciones');
const { responseProperties } = require('./properties/responseProperties');
const { programas } = require('../../solicitudes/schema/properties/programa');
const { estatatusInspecciones } = require('./properties/estatusInspecciones');

const createInspeccionesSchema = {
  tags: ['Inspecciones'],
  description: 'Given an object with inspeccion required data, then save a ispeccion in database.',
  body: {
    type: 'object',
    properties: {
      Id: { type: 'integer' },
      ...inspecciones,
      estatatusInspecciones: {
        type: 'object',
        properties: {
          ...estatatusInspecciones,
          programas: {
            type: 'object',
            properties: {
              ...programas,
            },
          },
        },
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            inspeccionesId: { type: 'integer' },
            ...inspecciones,
            ...responseProperties,
            estatatusInspecciones: {
              type: 'array',
              properties: {
                estatusInspeccionesid: { type: 'integer' },
                ...estatatusInspecciones,
                ...responseProperties,
                programas: {
                  type: 'array',
                  properties: {
                    programaid: { type: 'integer' },
                    ...programas,
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
};

module.exports = createInspeccionesSchema;
