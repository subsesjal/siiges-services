const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SECTOR_SERVICIO_SOCIAL_TABLE } = require('../../models/sectorServicioSocial');

const sectorServicioSocialCSV = path.join(__dirname, '../../CSVFiles/sectores_servicio_social.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const sectorServicioSocialJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(sectorServicioSocialCSV);

    return queryInterface
      .bulkInsert(SECTOR_SERVICIO_SOCIAL_TABLE, sectorServicioSocialJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SECTOR_SERVICIO_SOCIAL_TABLE, null, {});
  },
};
