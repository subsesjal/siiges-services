const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_SOLICITUD_BECA_TABLE } = require('../models/tipoSolicitudBeca');

const tipoSolicitudBecaCSV = path.join(__dirname, '../CSVFiles/tipo_solicitudes_becas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoSolicitudBecaJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoSolicitudBecaCSV);

    return queryInterface
      .bulkInsert(TIPO_SOLICITUD_BECA_TABLE, tipoSolicitudBecaJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_SOLICITUD_BECA_TABLE, null, {});
  },
};
