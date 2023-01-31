const {
  findAllInstitucionesQuery,
  findOneInstitucionQuery,
  createInstitucionQuery,
  updateInstitucionQuery,
  deleteInstitucionQuery,
  createPlantelQuery,
  findOnePlantelQuery,
  updatePlantelQuery,
  deletePlantelQuery,
  updateDomicilioQuery,
  findOneRatificacionQuery,
  createRatificacionQuery,
  updateRatificacionQuery,
  deleteRatificacionQuery,
  createDirectorQuery,
  updateDirectorQuery,
} = require('../adapters/db');

const findAllInstituciones = require('./db/instituciones/find-all.instituciones.use-cases');
const findOneInstitucion = require('./db/instituciones/find-one.instituciones.use-cases');
const findOneInstitucionUsuario = require('./db/instituciones/find-one.institucion-usuario.use-cases');
const findPlantelesInstitucion = require('./db/instituciones/find.planteles-institucion.use-cases');
const createInstitucion = require('./db/instituciones/create.instituciones.use-cases');
const updateInstitucion = require('./db/instituciones/update.instituciones.use-cases');
const deleteInstitucion = require('./db/instituciones/delete.instituciones.use-cases');
const createPlantel = require('./db/planteles/create.planteles.use-cases');
const findOnePlantel = require('./db/planteles/find-one.planteles.use-case');
const updatePlantel = require('./db/planteles/update.planteles.use-cases');
const deletePlantel = require('./db/planteles/delete.planteles.use-cases');
const findOneRatificacion = require('./db/ratificaciones/find-one.ratificaciones.use-case');
const createRatificacion = require('./db/ratificaciones/create.ratificaciones.use-cases');
const updateRatificacion = require('./db/ratificaciones/update.ratificacion.use-case');
const deleteRatificacion = require('./db/ratificaciones/delete.ratificaciones.use-cases');
const createDirectorPlantel = require('./db/planteles/create.director-plantel.use-cases');
const updateDirectorPlantel = require('./db/planteles/update.director-plantel.use-cases');

module.exports = {
  findAllInstituciones: findAllInstituciones(findAllInstitucionesQuery),
  findOneInstitucion: findOneInstitucion(findOneInstitucionQuery),
  findOneInstitucionUsuario: findOneInstitucionUsuario(findOneInstitucionQuery),
  findPlantelesInstitucion: findPlantelesInstitucion(findOneInstitucionQuery),
  createInstitucion: createInstitucion(createInstitucionQuery),
  updateInstitucion: updateInstitucion(updateInstitucionQuery),
  deleteInstitucion: deleteInstitucion(deleteInstitucionQuery),
  createPlantel: createPlantel(
    findOneInstitucionQuery,
    createPlantelQuery,
  ),
  findOnePlantel: findOnePlantel(
    findOneInstitucionQuery,
    findOnePlantelQuery,
  ),
  updatePlantel: updatePlantel(
    updatePlantelQuery,
    findOnePlantelQuery,
    updateDomicilioQuery,
  ),
  deletePlantel: deletePlantel(deletePlantelQuery),
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
  createDirectorPlantel: createDirectorPlantel(
    findOnePlantelQuery,
    createDirectorQuery,
  ),
  updateDirectorPlantel: updateDirectorPlantel(
    findOnePlantelQuery,
    updateDirectorQuery,
  ),
};
