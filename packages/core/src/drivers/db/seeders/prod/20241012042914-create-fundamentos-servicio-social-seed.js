const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { FUNDAMENTO_SERVICIO_SOCIAL_TABLE } = require('../../models/fundamentoServicioSocial');

const fundamentoServicioSocialCSV = path.join(__dirname, '../../CSVFiles/fundamentos_servicio_social.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const fundamentoServicioSocialJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(fundamentoServicioSocialCSV);

    return queryInterface
      .bulkInsert(FUNDAMENTO_SERVICIO_SOCIAL_TABLE, fundamentoServicioSocialJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(FUNDAMENTO_SERVICIO_SOCIAL_TABLE, null, {});
  },
};
