const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ROL_TABLE } = require('../../models/rol');

const rolesCSV = path.join(__dirname, '../../CSVFiles/roles.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const rolesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(rolesCSV);

    return queryInterface.bulkInsert(ROL_TABLE, rolesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ROL_TABLE, null, {});
  },
};
