const { orgColegiados } = require('../../../adapters/db');

const { createAcuerdo } = require('./create.acuerdo.use-cases');
const { findOneAcuerdo } = require('./find-one.acuerdo.use-cases');
const { findGroupAcuerdos } = require('./find-group.acuerdos.use-cases');
const { updateAcuerdo } = require('./update.acuerdo.use-cases');

module.exports = {
  findOneAcuerdo: findOneAcuerdo(
    orgColegiados.findOneAcuerdoQuery,
  ),
  findGroupAcuerdos: findGroupAcuerdos(
    orgColegiados.findAllAcuerdosQuery,
  ),
  createAcuerdo: createAcuerdo(
    orgColegiados.findOneOrgColegiadoQuery,
    orgColegiados.createAcuerdoQuery,
  ),
  updateAcuerdo: updateAcuerdo(
    orgColegiados.findOneAcuerdoQuery,
    orgColegiados.updateAcuerdoQuery,
  ),
};
