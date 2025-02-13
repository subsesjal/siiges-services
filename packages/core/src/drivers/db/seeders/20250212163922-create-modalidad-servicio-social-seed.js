const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { MODALIDAD_SERVICIO_SOCIAL_TABLE } = require('../models/modalidadServicioSocial');

const modalidadServicioSocialCSV = path.join(__dirname, '../CSVFiles/modalidad_servicio_social.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const modalidadServicioSocialJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(modalidadServicioSocialCSV);

    return queryInterface
      .bulkInsert(MODALIDAD_SERVICIO_SOCIAL_TABLE, modalidadServicioSocialJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(MODALIDAD_SERVICIO_SOCIAL_TABLE, null, {});
  },
};
