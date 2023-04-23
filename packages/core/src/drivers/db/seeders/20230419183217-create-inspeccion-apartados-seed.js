const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INSPECCION_APARTADO_TABLE } = require('../models/inspeccionApartado');

const inspeccionApartadosCSV = path.join(__dirname, '../CSVFiles/inspeccion_apartados.csv');

module.exports = {
  async up(queryInterface) {
    const inspeccionApartadosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccionApartadosCSV);

    await queryInterface.bulkInsert(INSPECCION_APARTADO_TABLE, inspeccionApartadosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCION_APARTADO_TABLE, null, {});
  },
};
