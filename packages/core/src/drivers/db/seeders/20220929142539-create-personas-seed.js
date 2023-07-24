const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { PERSONA_TABLE } = require('../models/persona');

const personasCSV = path.join(__dirname, '../CSVFiles/personas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const personasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(personasCSV);

    return queryInterface.bulkInsert(PERSONA_TABLE, personasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PERSONA_TABLE, null, {});
  },
};
