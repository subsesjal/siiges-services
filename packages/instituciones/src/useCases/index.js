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
} = require('../adapters/db');

const findAllInstituciones = require('./db/instituciones/find-all.instituciones.use-cases');
const findOneInstitucion = require('./db/instituciones/find-one.instituciones.use-cases');
const findPlantelesInstitucion = require('./db/instituciones/find.planteles-institucion.use-cases');
const createInstitucion = require('./db/instituciones/create.instituciones.use-cases');
const updateInstitucion = require('./db/instituciones/update.instituciones.use-cases');
const deleteInstitucion = require('./db/instituciones/delete.instituciones.use-cases');
const createPlantel = require('./db/planteles/create.planteles.use-cases');
const findOnePlantel = require('./db/planteles/find-one.planteles.use-case');
const updatePlantel = require('./db/planteles/update.planteles.use-cases');
const deletePlantel = require('./db/planteles/delete.planteles.use-cases');

module.exports = {
  findAllInstituciones: findAllInstituciones(findAllInstitucionesQuery),
  findOneInstitucion: findOneInstitucion(findOneInstitucionQuery),
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
  deletePlantel: deletePlantel(
    deletePlantelQuery,
  ),
};
