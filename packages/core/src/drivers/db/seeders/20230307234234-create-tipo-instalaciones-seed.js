const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { TIPO_INSTALACION_TABLE } = require('../models/tipoInstalacion');

const tipoInstalacionesCSV = path.join(__dirname, '../CSVFiles/tipo_instalaciones.csv');

module.exports = {
  async up(queryInterface) {
    const tipoInstalacionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoInstalacionesCSV);

    await queryInterface.bulkInsert(TIPO_INSTALACION_TABLE, tipoInstalacionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_INSTALACION_TABLE, null, {});
  },
};
