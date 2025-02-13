const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { EJES_SERVICIO_SOCIAL_TABLE } = require('../models/ejesServicioSocial');

const ejesServicioSocialCSV = path.join(__dirname, '../CSVFiles/ejes_servicio_social.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const ejesServicioSocialJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(ejesServicioSocialCSV);

    return queryInterface
      .bulkInsert(EJES_SERVICIO_SOCIAL_TABLE, ejesServicioSocialJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(EJES_SERVICIO_SOCIAL_TABLE, null, {});
  },
};
