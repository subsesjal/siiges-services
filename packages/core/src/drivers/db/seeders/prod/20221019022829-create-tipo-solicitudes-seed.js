const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_SOLICITUD_TABLE } = require('../../models/tipoSolicitud');

const tipoSolicitudesCSV = path.join(__dirname, '../../CSVFiles/tipo_solicitudes.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoSolicitudesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoSolicitudesCSV);

    return queryInterface.bulkInsert(TIPO_SOLICITUD_TABLE, tipoSolicitudesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_SOLICITUD_TABLE, null, {});
  },
};
