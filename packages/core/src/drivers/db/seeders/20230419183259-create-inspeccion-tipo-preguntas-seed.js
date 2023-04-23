const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INSPECCION_TIPO_PREGUNTA_TABLE } = require('../models/inspeccionTipoPregunta');

const inspeccionTipoPreguntasCSV = path.join(__dirname, '../CSVFiles/inspeccion_tipo_preguntas.csv');

module.exports = {
  async up(queryInterface) {
    const inspeccionTipoPreguntasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccionTipoPreguntasCSV);

    await queryInterface.bulkInsert(
      INSPECCION_TIPO_PREGUNTA_TABLE,
      inspeccionTipoPreguntasJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCION_TIPO_PREGUNTA_TABLE, null, {});
  },
};
