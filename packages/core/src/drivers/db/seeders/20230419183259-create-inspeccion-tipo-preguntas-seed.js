const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INSPECCIONES_TIPO_PREGUNTAS_TABLE } = require('../models/inspeccionesTipoPreguntas');

const inspecciontipopreguntasCSV = path.join(__dirname, '../CSVFiles/inspeccion_tipopreguntas.csv');

module.exports = {
  async up(queryInterface) {
    const tipopreguntasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspecciontipopreguntasCSV);

    await queryInterface.bulkInsert(INSPECCIONES_TIPO_PREGUNTAS_TABLE, tipopreguntasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCIONES_TIPO_PREGUNTAS_TABLE, null, {});
  },
};
