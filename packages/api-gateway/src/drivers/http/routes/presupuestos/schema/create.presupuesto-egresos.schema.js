const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { presupuestoEgresos } = require('./properties/presupuestoEgresos');
const { presupuestos } = require('./properties/presupuestos');
const { tipos } = require('./properties/tipos');

const { presupuestoId: _, ...presupuestoEgresosBody } = presupuestoEgresos;
const createPresupuestoSchema = {
  tags: ['Presupuestos'],
  description: 'Create a presupuesto.',
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...presupuestoEgresosBody,
      presupuesto: {
        type: 'array',
        items: {
          properties: {
            ...presupuestos,
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
            ...presupuestoEgresos,
            presupuesto: {
              type: 'array',
              items: {
                properties: {
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
                },
              },
            },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createPresupuestoSchema };
