const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INSPECCIONES_APARTADOS_TABLE } = require('../models/inspeccionApartado');

const inspeccionapartadoCSV = path.join(__dirname, '../CSVFiles/inspecciones_apartados.csv');

module.exports = {
  async up(queryInterface) {
    const inspeccionapartadoJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccionapartadoCSV);

    await queryInterface.bulkInsert(INSPECCIONES_APARTADOS_TABLE, inspeccionapartadoJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCIONES_APARTADOS_TABLE, null, {});
  },
};
