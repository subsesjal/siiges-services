const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { TIPO_SOLICITUD_TABLE } = require('../models/tipoSolicitud');

const tipoSolicitudesCSV = path.join(__dirname, '../CSVFiles/tipo_solicitudes.csv');

module.exports = {
  async up(queryInterface) {
    const tipoSolicitudesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoSolicitudesCSV);

    await queryInterface.bulkInsert(TIPO_SOLICITUD_TABLE, tipoSolicitudesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_SOLICITUD_TABLE, null, {});
  },
};
