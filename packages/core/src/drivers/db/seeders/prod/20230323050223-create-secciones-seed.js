const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SECCION_TABLE } = require('../../models/seccion');

const seccionesCSV = path.join(__dirname, '../../CSVFiles/secciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const seccionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(seccionesCSV);

    return queryInterface.bulkInsert(SECCION_TABLE, seccionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SECCION_TABLE, null, {});
  },
};
