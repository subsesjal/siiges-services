const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { INSPECCION_APARTADO_TABLE } = require('../models/inspeccionApartado');

const inspeccionApartadosCSV = path.join(__dirname, '../CSVFiles/inspeccion_apartados.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const inspeccionApartadosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccionApartadosCSV);

    return queryInterface.bulkInsert(INSPECCION_APARTADO_TABLE, inspeccionApartadosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCION_APARTADO_TABLE, null, {});
  },
};
