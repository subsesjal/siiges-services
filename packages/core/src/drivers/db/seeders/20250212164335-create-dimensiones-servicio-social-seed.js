const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { DIMENSION_SERVICIO_SOCIAL_TABLE } = require('../models/dimensionServicioSocial');

const dimensionServicioSocialCSV = path.join(__dirname, '../CSVFiles/dimensiones_servicio_social.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const dimensionServicioSocialJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(dimensionServicioSocialCSV);

    return queryInterface
      .bulkInsert(DIMENSION_SERVICIO_SOCIAL_TABLE, dimensionServicioSocialJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(DIMENSION_SERVICIO_SOCIAL_TABLE, null, {});
  },
};
