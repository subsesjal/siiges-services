const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { HIGIENE_TABLE } = require('../../models/higiene');

const higienesCSV = path.join(__dirname, '../../CSVFiles/higienes.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const higienesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(higienesCSV);

    return queryInterface.bulkInsert(HIGIENE_TABLE, higienesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(HIGIENE_TABLE, null, {});
  },
};
