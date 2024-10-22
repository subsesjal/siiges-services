const institucionAdapter = require('../../../adapters/db');

const findAllInstituciones = require('./find-all.instituciones.use-cases');
const findOneInstitucion = require('./find-one.instituciones.use-cases');
const findOneInstitucionUsuario = require('./find-one.institucion-usuario.use-cases');
const findPlantelesInstitucion = require('./find.planteles-institucion.use-cases');
const createInstitucion = require('./create.instituciones.use-cases');
const updateInstitucion = require('./update.instituciones.use-cases');
const deleteInstitucion = require('./delete.instituciones.use-cases');
const findAllTipoInstituciones = require('./find-all.tipoInstituciones.use-cases');
const createOneInstitucionesDgp = require('./create-one.institucionesDgp.use-cases');
const {
  createFormacionRector,
  findAllFormacionRector,
  findOneFormacionRector,
  updateFormacionRector,
} = require('./formacionesRectores');

const findFormacionRector = findOneFormacionRector(
  institucionAdapter.findOneRectorQuery,
  institucionAdapter.findOneFormacionRectorQuery,
);

module.exports = {
  findAllInstituciones: findAllInstituciones(institucionAdapter.findAllInstitucionesQuery),
  findAllTipoInstituciones: findAllTipoInstituciones(
    institucionAdapter.findAllTipoInstitucionesQuery,
  ),
  createOneInstitucionesDgp: createOneInstitucionesDgp(
    institucionAdapter.createInstitucionDgpQuery,
    institucionAdapter.findOneInstitucionQuery,
    institucionAdapter.findOneInstitucionDgpQuery,
    institucionAdapter.updateInstitucionDgpQuery,
  ),
  findOneInstitucion: findOneInstitucion(institucionAdapter.findOneInstitucionQuery),
  findOneInstitucionUsuario: findOneInstitucionUsuario(
    institucionAdapter.findOneInstitucionQuery,
    institucionAdapter.findOneUsuarioUsuarioQuery,
    institucionAdapter.findOneUsuarioQuery,
  ),
  findPlantelesInstitucion: findPlantelesInstitucion(institucionAdapter.findOneInstitucionQuery),
  createInstitucion: createInstitucion(
    institucionAdapter.createInstitucionQuery,
    institucionAdapter.createRectorQuery,
  ),
  updateInstitucion: updateInstitucion(
    institucionAdapter.findOneInstitucionQuery,
    institucionAdapter.updateInstitucionQuery,
    institucionAdapter.updatePersonaQuery,
    institucionAdapter.updateRatificacionQuery,
    institucionAdapter.createRatificacionQuery,
    institucionAdapter.createRectorQuery,
  ),
  deleteInstitucion: deleteInstitucion(
    institucionAdapter.findOneInstitucionQuery,
    institucionAdapter.deleteInstitucionQuery,
    institucionAdapter.deleteRectorQuery,
  ),
  createFormacionRector: createFormacionRector(
    institucionAdapter.createFormacionRectorQuery,
    institucionAdapter.findOneRectorQuery,
    institucionAdapter.findOneNivelQuery,
  ),
  findAllFormacionRector: findAllFormacionRector(
    institucionAdapter.findAllFormacionRectorQuery,
    institucionAdapter.findAllFormacionQuery,
  ),
  findOneFormacionRector: findFormacionRector,
  updateFormacionRector: updateFormacionRector(
    findFormacionRector,
    institucionAdapter.findOneNivelQuery,
    institucionAdapter.updateFormacionQuery,
  ),
};
