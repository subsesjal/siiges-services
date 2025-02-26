const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_SOLICITUD_FOLIO_TABLE } = require('../../models/tipoSolicitudFolio');

const tipoSolicitudFolioCSV = path.join(__dirname, '../../CSVFiles/tipo_solicitudes_folios.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoSolicitudFolioJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoSolicitudFolioCSV);

    return queryInterface
      .bulkInsert(TIPO_SOLICITUD_FOLIO_TABLE, tipoSolicitudFolioJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_SOLICITUD_FOLIO_TABLE, null, {});
  },
};
