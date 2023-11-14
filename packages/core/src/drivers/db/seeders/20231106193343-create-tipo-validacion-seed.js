const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_VALIDACIONES_TABLE } = require('../models/tipoValidaciones');

const tipoValidacionesCSV = path.join(__dirname, '../CSVFiles/tipo_validacion.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoValidacionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoValidacionesCSV);

    return queryInterface.bulkInsert(TIPO_VALIDACIONES_TABLE, tipoValidacionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_VALIDACIONES_TABLE, null, {});
  },
};
