const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { PERSONA_TABLE } = require('../models/persona');

const personasCSV = path.join(__dirname, '../CSVFiles/personas.csv');

module.exports = {
  async up(queryInterface) {
    const personasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(personasCSV);

    await queryInterface.bulkInsert(PERSONA_TABLE, personasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PERSONA_TABLE, null, {});
  },
};
