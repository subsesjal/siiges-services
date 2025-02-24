const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_DOCUMENTO_TABLE } = require('../../models/tipoDocumento');

const tipoDocumentoCSV = path.join(__dirname, '../../CSVFiles/tipo_documentos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoDocumentoJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoDocumentoCSV);

    return queryInterface
      .bulkInsert(TIPO_DOCUMENTO_TABLE, tipoDocumentoJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_DOCUMENTO_TABLE, null, {});
  },
};
