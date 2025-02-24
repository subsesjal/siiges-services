const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { MODALIDAD_TABLE } = require('../../models/modalidad');

const modalidadesCSV = path.join(__dirname, '../../CSVFiles/modalidades.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const modalidadesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(modalidadesCSV);

    return queryInterface.bulkInsert(MODALIDAD_TABLE, modalidadesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(MODALIDAD_TABLE, null, {});
  },
};
