const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { VIGILANCIA_TIPO_PREGUNTA_TABLE } = require('../../models/vigilanciaTipoPregunta');

const tipoVigilanciaPreguntaCSV = path.join(__dirname, '../../CSVFiles/vigilancia_tipo_preguntas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoVigilanciaPreguntasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoVigilanciaPreguntaCSV);

    // eslint-disable-next-line max-len
    return queryInterface.bulkInsert(VIGILANCIA_TIPO_PREGUNTA_TABLE, tipoVigilanciaPreguntasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(VIGILANCIA_TIPO_PREGUNTA_TABLE, null, {});
  },
};
