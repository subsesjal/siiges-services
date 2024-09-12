const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { presupuestoEgresos } = require('./properties/presupuestoEgresos');
const { presupuestos } = require('./properties/presupuestos');
const { tipos } = require('./properties/tipos');

const findAllPresupuestoSchema = {
  tags: ['Presupuestos'],
  description: 'find all data of presupuesto.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...presupuestoEgresos,
              presupuesto: {
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
                  },
                },
              },
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllPresupuestoSchema };
