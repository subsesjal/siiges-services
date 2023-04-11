const {
  findOneRatificacionQuery,
  createRatificacionQuery,
  updateRatificacionQuery,
  deleteRatificacionQuery,
  findOneInstitucionQuery,
} = require('../../../adapters/db');

const findOneRatificacion = require('./find-one.ratificaciones.use-case');
const createRatificacion = require('./create.ratificaciones.use-cases');
const updateRatificacion = require('./update.ratificacion.use-case');
const deleteRatificacion = require('./delete.ratificaciones.use-cases');

module.exports = {
  findOneRatificacionNombre: findOneRatificacion(
    findOneInstitucionQuery,
    findOneRatificacionQuery,
  ),
  createRatificacionNombre: createRatificacion(
    findOneInstitucionQuery,
    createRatificacionQuery,
  ),
  updateRatificacionNombre: updateRatificacion(
    findOneInstitucionQuery,
    updateRatificacionQuery,
  ),
  deleteRatificacionNombre: deleteRatificacion(deleteRatificacionQuery),
};
