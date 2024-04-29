const {
  planteles,
  solicitudes,
  asignaturas,
} = require('../../../adapters/db');

const createPlantelInfraestructura = require('./create.plantel-infraestructura.use-cases');
const deletePlantelInfraestructura = require('./delete.plantel-infraestructura.use-cases');
const findGroupPlantelInfraestructura = require('./find-group.plantel-infraestructura.use-cases');
const findOnePlantelInfraestructura = require('./find-one.plantel-infraestructura.use-cases');
const findGroupPlantelesUsuario = require('./find-group.planteles-usuario.use-cases');
const updateInfraestructura = require('./update-plantel-infraestructura.use-cases');

module.exports = {
  createPlantelInfraestructura: createPlantelInfraestructura(
    planteles.findOnePlantelQuery,
    solicitudes.findOneProgramaQuery,
    asignaturas.findOneAsignaturaQuery,
    planteles.createInfraestructuraQuery,
    planteles.createInfraestructuraProgramaQuery,
    planteles.createAsignaturaInfraestructuraQuery,
  ),
  updateInfraestructura: updateInfraestructura(
    planteles.findOnePlantelQuery,
    planteles.findOneInfraestructuraQuery,
    planteles.findOneInfraestructuraProgramaQuery,
    solicitudes.findOneProgramaQuery,
    asignaturas.findOneAsignaturaQuery,
    planteles.updateInfraestructuraQuery,
    planteles.createAsignaturaInfraestructuraQuery,
    planteles.findAllAsignaturaInfraestructuraQuery,
    planteles.findOneAsignaturaInfraestructuraQuery,
    planteles.deleteAsignaturaInfraestructuraQuery,
  ),
  deletePlantelInfraestructura: deletePlantelInfraestructura(
    planteles.findOneInfraestructuraQuery,
    planteles.deleteInfraestructuraQuery,
  ),
  findGroupPlantelInfraestructura: findGroupPlantelInfraestructura(
    planteles.findAllInfraestructuraQuery,
    planteles.findOneInfraestructuraQuery,
    solicitudes.findOneProgramaQuery,
    planteles.findAllInfraestructuraProgramaQuery,
  ),
  findOnePlantelInfraestructura: findOnePlantelInfraestructura(
    planteles.findOneInfraestructuraQuery,
  ),
  findGroupPlantelesUsuario: findGroupPlantelesUsuario(
    planteles.findOneInstitucionQuery,
  ),
};
