const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { MODALIDAD_TITULACION_TABLE } = require('../models/modalidadTitulacion');

const modalidadTitulacionCSV = path.join(__dirname, '../CSVFiles/modalidades_titulacion.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const modalidadTitulacionJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(modalidadTitulacionCSV);

    return queryInterface
      .bulkInsert(MODALIDAD_TITULACION_TABLE, modalidadTitulacionJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(MODALIDAD_TITULACION_TABLE, null, {});
  },
};
