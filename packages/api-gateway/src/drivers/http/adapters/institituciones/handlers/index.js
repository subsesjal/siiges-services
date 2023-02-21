const createDirectorPlantel = require('./create.handlers.director-plantel.adapters');
const createInstitucion = require('./create.handlers.institucion.adapters');
const createPlantel = require('./create.handlers.plantel.adapters');
const createRatificacionNombre = require('./create.handlers.ratificacion-nombre.adapters');
const deleteInstitucion = require('./delete.handlers.institucion.adapters');
const deletePlantel = require('./delete.handlers.plantel.adapters');
const deleteRatificacionNombre = require('./delete.handlers.ratificacion-nombre.adapters');
const findAllInstituciones = require('./find-all.handlers.instituciones.adapters');
const findOneInstitucionUsuario = require('./find-one.handlers.institucion-ususario.adapters');
const findOneInstitucion = require('./find-one.handlers.institucion.adapters');
const findOnePlantel = require('./find-one.handlers.plantel.adapters');
const findOneRatificacionNombre = require('./find-one.handlers.ratificacion-nombre.adapters');
const findPlantelesInstitucion = require('./find.handlers.planteles-institucion.adapters');
const updateDirectorPlantel = require('./update.handlers.director-plantel.adapters');
const updateInstitucion = require('./update.handlers.institucion.adapters');
const updatePlantel = require('./update.handlers.plantel.adapters');
const updateRatificacionNombre = require('./update.handlers.ratificacion-nombre.adapters');

module.exports = {
  createDirectorPlantel,
  createInstitucion,
  createPlantel,
  createRatificacionNombre,
  deleteInstitucion,
  deletePlantel,
  deleteRatificacionNombre,
  findAllInstituciones,
  findOneInstitucionUsuario,
  findOneInstitucion,
  findOnePlantel,
  findOneRatificacionNombre,
  findPlantelesInstitucion,
  updateDirectorPlantel,
  updateInstitucion,
  updatePlantel,
  updateRatificacionNombre,
};
