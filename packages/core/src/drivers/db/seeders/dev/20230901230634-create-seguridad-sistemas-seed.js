const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SEGURIDAD_SISTEMA_TABLE } = require('../../models/seguridadSistema');

const seguridadSistemasCSV = path.join(__dirname, '../../CSVFiles/seguridad_sistemas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const seguridadSistemasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(seguridadSistemasCSV);

    return queryInterface.bulkInsert(SEGURIDAD_SISTEMA_TABLE, seguridadSistemasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SEGURIDAD_SISTEMA_TABLE, null, {});
  },
};
