const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { INSPECCION_TIPO_PREGUNTA_TABLE } = require('../../models/inspeccionTipoPregunta');

const inspeccionTipoPreguntasCSV = path.join(__dirname, '../../CSVFiles/inspeccion_tipo_preguntas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const inspeccionTipoPreguntasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccionTipoPreguntasCSV);

    return queryInterface.bulkInsert(
      INSPECCION_TIPO_PREGUNTA_TABLE,
      inspeccionTipoPreguntasJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCION_TIPO_PREGUNTA_TABLE, null, {});
  },
};
