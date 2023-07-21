const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { TIPO_INSTALACION_TABLE } = require('../models/tipoInstalacion');

const tipoInstalacionesCSV = path.join(__dirname, '../CSVFiles/tipo_instalaciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoInstalacionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoInstalacionesCSV);

    return queryInterface.bulkInsert(TIPO_INSTALACION_TABLE, tipoInstalacionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_INSTALACION_TABLE, null, {});
  },
};
