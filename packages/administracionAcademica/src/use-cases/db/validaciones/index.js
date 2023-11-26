const { createAlumnoValidacion } = require('./create.alumno-validacion.use-cases');
const { findOneAlumnoValidacion } = require('./find-one.alumno-validacion.use-cases');
const { updateAlumnoValidacion } = require('./update.alumno-validacion.use-cases');
const { validaciones } = require('../../../adapters/db');

module.exports = {
  createAlumnoValidacion: createAlumnoValidacion(
    validaciones.findOneSituacionesValidacionQuery,
    validaciones.findOneTipoValidacionesQuery,
    validaciones.findOneValidacionQuery,
    validaciones.createValidacionesQuery,
    validaciones.findOneUsuarioQuery,
    validaciones.findOneEstadoQuery,
    validaciones.findOneAlumnoQuery,
    validaciones.findOneNivelQuery,
  ),
  findOneAlumnoValidacion: findOneAlumnoValidacion(
    validaciones.findOneValidacionQuery,
  ),
  updateAlumnoValidacion: updateAlumnoValidacion(
    validaciones.findOneSituacionesValidacionQuery,
    validaciones.findOneTipoValidacionesQuery,
    validaciones.findOneValidacionQuery,
    validaciones.updateValidacionesQuery,
    validaciones.findOneUsuarioQuery,
    validaciones.findOneEstadoQuery,
    validaciones.findOneNivelQuery,
  ),
};
