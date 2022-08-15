const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { ROL_TABLE } = require('../models/rol');

const rolesCSV = path.join(__dirname, '../CSVFiles/roles.csv');

module.exports = {
  async up(queryInterface) {
    const rolesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(rolesCSV);

    await queryInterface.bulkInsert(ROL_TABLE, rolesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ROL_TABLE, null, {});
  },
};
