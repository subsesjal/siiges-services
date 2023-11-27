const { orgColegiados, instituciones } = require('../../../adapters/db');

const createOrgColegiado = require('./create.organo-colegiado.use-cases');
const { findOneOrgColegiado } = require('./find-one.organo-colegiado.use-cases');
const { findGroupOrgColegiados } = require('./find-group.organos-colegiados.use-cases');
const { updateOrgColegiado } = require('./update.organo-colegiado.use-cases');

module.exports = {
  findOneOrgColegiado: findOneOrgColegiado(
    orgColegiados.findOneOrgColegiadoQuery,
  ),
  findGroupOrgColegiados: findGroupOrgColegiados(
    orgColegiados.findAllOrgColegiadosQuery,
  ),
  createOrgColegiado: createOrgColegiado(
    instituciones.findOneInstitucionQuery,
    orgColegiados.createOrgColegiadoQuery,
  ),
  updateOrgColegiado: updateOrgColegiado(
    orgColegiados.findOneOrgColegiadoQuery,
    orgColegiados.updateOrgColegiadoQuery,
  ),
};
