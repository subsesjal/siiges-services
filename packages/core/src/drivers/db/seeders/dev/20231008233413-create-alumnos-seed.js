const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ALUMNO_TABLE } = require('../../models/alumno');

const alumnosCSV = path.join(__dirname, '../../CSVFiles/alumnos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const alumnosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(alumnosCSV);

    return queryInterface.bulkInsert(ALUMNO_TABLE, alumnosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ALUMNO_TABLE, null, {});
  },
};
