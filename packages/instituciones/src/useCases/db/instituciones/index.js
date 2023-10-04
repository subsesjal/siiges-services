const {
  findAllInstitucionesQuery,
  findOneInstitucionQuery,
  createInstitucionQuery,
  updateInstitucionQuery,
  deleteInstitucionQuery,
  createRectorQuery,
  deleteRectorQuery,
  updatePersonaQuery,
  createFormacionRectorQuery,
  findOneRectorQuery,
  findOneNivelQuery,
  findAllFormacionRectorQuery,
  findAllFormacionQuery,
  findOneFormacionRectorQuery,
  updateFormacionQuery,
} = require('../../../adapters/db');

const findAllInstituciones = require('./find-all.instituciones.use-cases');
const findOneInstitucion = require('./find-one.instituciones.use-cases');
const findOneInstitucionUsuario = require('./find-one.institucion-usuario.use-cases');
const findPlantelesInstitucion = require('./find.planteles-institucion.use-cases');
const createInstitucion = require('./create.instituciones.use-cases');
const updateInstitucion = require('./update.instituciones.use-cases');
const deleteInstitucion = require('./delete.instituciones.use-cases');
const {
  createFormacionRector,
  findAllFormacionRector,
  findOneFormacionRector,
  updateFormacionRector,
} = require('./formacionesRectores');

const findFormacionRector = findOneFormacionRector(
  findOneRectorQuery,
  findOneFormacionRectorQuery,
);

module.exports = {
  findAllInstituciones: findAllInstituciones(findAllInstitucionesQuery),
  findOneInstitucion: findOneInstitucion(findOneInstitucionQuery),
  findOneInstitucionUsuario: findOneInstitucionUsuario(findOneInstitucionQuery),
  findPlantelesInstitucion: findPlantelesInstitucion(findOneInstitucionQuery),
  createInstitucion: createInstitucion(
    createInstitucionQuery,
    createRectorQuery,
  ),
  updateInstitucion: updateInstitucion(
    findOneInstitucionQuery,
    updateInstitucionQuery,
    updatePersonaQuery,
    createRectorQuery,
  ),
  deleteInstitucion: deleteInstitucion(
    findOneInstitucionQuery,
    deleteInstitucionQuery,
    deleteRectorQuery,
  ),
  createFormacionRector: createFormacionRector(
    createFormacionRectorQuery,
    findOneRectorQuery,
    findOneNivelQuery,
  ),
  findAllFormacionRector: findAllFormacionRector(
    findAllFormacionRectorQuery,
    findAllFormacionQuery,
  ),
  findOneFormacionRector: findFormacionRector,
  updateFormacionRector: updateFormacionRector(
    findFormacionRector,
    findOneNivelQuery,
    updateFormacionQuery,
  ),
};
