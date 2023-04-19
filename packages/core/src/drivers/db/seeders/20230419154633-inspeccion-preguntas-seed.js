const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INSPECCION_PREGUNTAS_TABLE } = require('../models/inspeccionPreguntas');

const inspeccionpreguntasCSV = path.join(__dirname, '../CSVFiles/inspeccion_preguntas.csv');

module.exports = {
  async up(queryInterface) {
    const preguntasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccionpreguntasCSV);

    await queryInterface.bulkInsert(INSPECCION_PREGUNTAS_TABLE, preguntasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCION_PREGUNTAS_TABLE, null, {});
  },
};
