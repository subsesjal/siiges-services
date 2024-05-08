const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { GRADO_ACADEMICO_TABLE } = require('../models/gradoAcademico');

const situacionesValidacion = path.join(__dirname, '../CSVFiles/grado_academico.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoDocumentoJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(situacionesValidacion);

    return queryInterface.bulkInsert(GRADO_ACADEMICO_TABLE, tipoDocumentoJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(GRADO_ACADEMICO_TABLE, null, {});
  },
};
