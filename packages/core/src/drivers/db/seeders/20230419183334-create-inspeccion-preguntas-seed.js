const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INSPECCION_PREGUNTA_TABLE } = require('../models/inspeccionPregunta');

const inspeccionPreguntasCSV = path.join(__dirname, '../CSVFiles/inspeccion_preguntas.csv');

module.exports = {
  async up(queryInterface) {
    const inspeccionPreguntasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccionPreguntasCSV);

    await queryInterface.bulkInsert(INSPECCION_PREGUNTA_TABLE, inspeccionPreguntasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCION_PREGUNTA_TABLE, null, {});
  },
};
