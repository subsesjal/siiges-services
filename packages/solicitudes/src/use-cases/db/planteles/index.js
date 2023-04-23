const {
  planteles,
  solicitudes,
  asignaturas,
} = require('../../../adapters/db');

const createPlantelInfraestructura = require('./create.plantel-infraestructura.use-cases');
const findGroupPlantelInfraestructura = require('./find-group.plantel-infraestructura.use-cases');
const findGroupPlantelesUsuario = require('./find-group.planteles-usuario.use-cases');

module.exports = {
  createPlantelInfraestructura: createPlantelInfraestructura(
    planteles.findOnePlantelQuery,
    solicitudes.findOneProgramaQuery,
    asignaturas.findOneAsignaturaQuery,
    planteles.createInfraestructuraQuery,
    planteles.createInfraestructuraProgramaQuery,
    planteles.createAsignaturaInfraestructuraQuery,
  ),
  findGroupPlantelInfraestructura: findGroupPlantelInfraestructura(
    planteles.findAllInfraestructuraQuery,
  ),
  findGroupPlantelesUsuario: findGroupPlantelesUsuario(
    planteles.findOneInstitucionQuery,
  ),
};
