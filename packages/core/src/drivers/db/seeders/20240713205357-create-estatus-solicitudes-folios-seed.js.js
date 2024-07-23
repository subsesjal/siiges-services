const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ESTATUS_SOLICITUD_FOLIO_TABLE } = require('../models/estatusSolicitudFolio');

const estatusSolicitudFolioCSV = path.join(__dirname, '../CSVFiles/estatus_solicitudes_folios.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusSolicitudFolioJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusSolicitudFolioCSV);

    return queryInterface
      .bulkInsert(ESTATUS_SOLICITUD_FOLIO_TABLE, estatusSolicitudFolioJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_SOLICITUD_FOLIO_TABLE, null, {});
  },
};
