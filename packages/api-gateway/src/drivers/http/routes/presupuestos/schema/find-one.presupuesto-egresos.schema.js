// const { presupuestos } = require('./properties/presupuestos');
// const { tipos } = require('./properties/tipos');

const findOnePresupuestoSchema = {
  tags: ['Presupuestos'],
  description: 'find all data of presupuesto.',
  params: {
    type: 'object',
    properties: {
      presupuestoEgresoId: { type: 'integer' },
    },
    required: ['presupuestoEgresoId'],
  },
  querystring: {
    type: 'object',
    properties: {
      filter: { type: 'string' }, // Parámetro de consulta para filtrar por tipoPresupuestoId
    },
    additionalProperties: false, // No se permiten propiedades adicionales en el objeto de consulta
  },
};

module.exports = { findOnePresupuestoSchema };
