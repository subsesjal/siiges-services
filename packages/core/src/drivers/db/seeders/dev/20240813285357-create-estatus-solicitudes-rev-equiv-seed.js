const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ESTATUS_SOLICITUD_REV_EQUIV_TABLE } = require('../../models/estatusSolicitudRevEquiv');

const estatusSolicitudRevEquivCSV = path.join(__dirname, '../../CSVFiles/estatus_solicitudes_rev_equiv.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusSolicitudRevEquivJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusSolicitudRevEquivCSV);

    return queryInterface
      .bulkInsert(ESTATUS_SOLICITUD_REV_EQUIV_TABLE, estatusSolicitudRevEquivJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_SOLICITUD_REV_EQUIV_TABLE, null, {});
  },
};
