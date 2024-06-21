const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SOLICITUD_FOLIOS_TABLE } = require('../models/solicitudFolios');

const solicitudFoliosCSV = path.join(__dirname, '../CSVFiles/solicitud_folios.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const solicitudFoliosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(solicitudFoliosCSV);

    return queryInterface.bulkInsert(SOLICITUD_FOLIOS_TABLE, solicitudFoliosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SOLICITUD_FOLIOS_TABLE, null, {});
  },
};
