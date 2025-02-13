const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SECTORES_SERVICIO_SOCIAL_TABLE } = require('../models/sectoresServicioSocial');

const sectoresServicioSocialCSV = path.join(__dirname, '../CSVFiles/sectores_servicio_social.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const sectoresServicioSocialJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(sectoresServicioSocialCSV);

    return queryInterface
      .bulkInsert(SECTORES_SERVICIO_SOCIAL_TABLE, sectoresServicioSocialJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SECTORES_SERVICIO_SOCIAL_TABLE, null, {});
  },
};
