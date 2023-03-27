const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { SECCION_TABLE } = require('../models/seccion');

const seccionesCSV = path.join(__dirname, '../CSVFiles/secciones.csv');

module.exports = {
  async up(queryInterface) {
    const seccionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(seccionesCSV);

    await queryInterface.bulkInsert(SECCION_TABLE, seccionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SECCION_TABLE, null, {});
  },
};
