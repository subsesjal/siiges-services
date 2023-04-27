const {
  inspecciones,
} = require('../../../adapters/db');

const createInspecciones = require('./create.inspecciones.use-cases');

module.exports = {
  createInspecciones: createInspecciones(
    inspecciones.createInspeccionesQuery,
  ),

};
