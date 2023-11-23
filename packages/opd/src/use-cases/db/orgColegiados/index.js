const { orgColegiados, instituciones } = require('../../../adapters/db');

const createOrgColegiado = require('./create.orgColegiados.use-cases');

module.exports = {
  createOrgColegiado: createOrgColegiado(
    instituciones.findOneInstitucionQuery,
    orgColegiados.createOrgColegiadoQuery,
  ),
};
