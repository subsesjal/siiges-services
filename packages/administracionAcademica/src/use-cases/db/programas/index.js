const { programas } = require('../../../adapters/db');

const findAllProgramas = require('./find-all.programas.use-cases');
const { findPlantelProgramas } = require('./find-plantel.programas.use-cases');
const findInstitucionProgramas = require('./find-institucion.programas.use-cases');
const findOnePrograma = require('./find-one.programa.use-cases');
const findOneProgramaRvoe = require('./find-one.programa-rvoe.use-cases');
const updatePrograma = require('./update-one.programa.use-cases');
const updateManyProgramas = require('./update-many.programas.use-cases');
const {
  findRvoePublic,
  findMunicipiosJalisco,
  findInstitucionesByMunicipio,
  findPlantelesByInstitucion,
} = require('./find-rvoe-public.use-cases');

module.exports = {
  findAllProgramas: findAllProgramas(
    programas.findAllProgramasQuery,
    programas.findOneProgramaQuery,
    programas.includeProgramasQuery,
    programas.whereProgramasQuery,
  ),
  findPlantelProgramas: findPlantelProgramas(
    programas.findPlantelProgramasQuery,
    programas.includeProgramasQuery,
    programas.whereProgramasQuery,
  ),
  findInstitucionProgramas: findInstitucionProgramas(
    programas.findPlantelQuery,
    programas.findPlantelProgramasQuery,
    programas.includeProgramasQuery,
    programas.whereProgramasQuery,
  ),
  findOnePrograma: findOnePrograma(
    programas.findOneProgramaQuery,
    programas.includeProgramasQuery,
  ),
  findOneProgramaRvoe: findOneProgramaRvoe(
    programas.findOneProgramaQuery,
  ),
  updatePrograma: updatePrograma(
    programas.findOneProgramaQuery,
    programas.updateProgramaQuery,
  ),
  updateManyProgramas: updateManyProgramas(
    programas.updateProgramaQuery,
  ),
  findRvoePublic: findRvoePublic(
    programas.findAllProgramasQuery,
    programas.includePublicRvoeQuery,
    programas.wherePublicRvoeQuery,
  ),
  findMunicipiosJalisco: findMunicipiosJalisco(
    programas.findMunicipiosQuery,
  ),
  findInstitucionesByMunicipio: findInstitucionesByMunicipio(
    programas.findPlantelesQuery,
    programas.findInstitucionesQuery,
  ),
  findPlantelesByInstitucion: findPlantelesByInstitucion(
    programas.findPlantelesQuery,
  ),
};
