const findAllProgramas = require('./find-all.handlers.programas.adapters');
const findPlantelProgramas = require('./find-plantel.handlers.programas.adapters');
const findInstitucionProgramas = require('./find-instituciones.handlers.programas.adapters');
const findOnePrograma = require('./find-one.handlers.programa.adapters');
const updatePrograma = require('./update-one.handlers.programa.adapters');
const updateManyProgramas = require('./update-many.handlers.programas.adapters');
const {
  findRvoePublic,
  findMunicipiosJalisco,
  findInstitucionesByMunicipio,
  findPlantelesByInstitucion,
} = require('./find-rvoe-public.handlers.programas.adapters');

module.exports = {
  findAllProgramas,
  findPlantelProgramas,
  findInstitucionProgramas,
  findOnePrograma,
  updatePrograma,
  updateManyProgramas,
  findRvoePublic,
  findMunicipiosJalisco,
  findInstitucionesByMunicipio,
  findPlantelesByInstitucion,
};
