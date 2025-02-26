const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { INSPECCION_PREGUNTA_TABLE } = require('../../models/inspeccionPregunta');

const inspeccionPreguntasCSV = path.join(__dirname, '../../CSVFiles/inspeccion_preguntas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const inspeccionPreguntasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccionPreguntasCSV);

    return queryInterface.bulkInsert(INSPECCION_PREGUNTA_TABLE, inspeccionPreguntasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCION_PREGUNTA_TABLE, null, {});
  },
};
