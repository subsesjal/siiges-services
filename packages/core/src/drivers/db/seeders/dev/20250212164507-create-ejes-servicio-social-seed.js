const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { EJE_SERVICIO_SOCIAL_TABLE } = require('../../models/ejeServicioSocial');

const ejeServicioSocialCSV = path.join(__dirname, '../../CSVFiles/ejes_servicio_social.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const ejeServicioSocialJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(ejeServicioSocialCSV);

    return queryInterface
      .bulkInsert(EJE_SERVICIO_SOCIAL_TABLE, ejeServicioSocialJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(EJE_SERVICIO_SOCIAL_TABLE, null, {});
  },
};
