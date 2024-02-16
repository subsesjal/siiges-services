const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { presupuestos } = require('./properties/presupuestos');
const { tipos } = require('./properties/tipos');

const updatePresupuestoSchema = {
  tags: ['Presupuestos'],
  description: 'find all data of presupuesto.',
  params: {
    type: 'object',
    properties: {
      presupuestoEgresoId: { type: 'integer' },
    },
    required: ['presupuestoEgresoId'],
  },
  body: {
    title: 'Data body',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        ...presupuestos,
      },

    },
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
              ...presupuestos,
              tipoPresupuesto: {
                type: 'object',
                properties: { ...tipos },
              },
              tipoEgreso: {
                type: 'object',
                properties: { ...tipos },
              },
              tipoRecursoPresupuesto: {
                type: 'object',
                properties: { ...tipos },
              },
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { updatePresupuestoSchema };
