const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_EGRESO_TABLE } = require('../models/tipoEgreso');

const tipoEgresoCSV = path.join(__dirname, '../CSVFiles/tipo_egresos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoEgresoJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoEgresoCSV);

    return queryInterface.bulkInsert(TIPO_EGRESO_TABLE, tipoEgresoJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_EGRESO_TABLE, null, {});
  },
};
