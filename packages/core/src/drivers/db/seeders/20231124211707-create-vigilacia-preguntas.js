const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { VIGILANCIA_PREGUNTA_TABLE } = require('../models/vigilanciaPregunta');

const vigilanciaPreguntaCSV = path.join(__dirname, '../CSVFiles/vigilancia_preguntas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const vigilanciaPreguntaJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(vigilanciaPreguntaCSV);

    // eslint-disable-next-line max-len
    return queryInterface.bulkInsert(VIGILANCIA_PREGUNTA_TABLE, vigilanciaPreguntaJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(VIGILANCIA_PREGUNTA_TABLE, null, {});
  },
};
