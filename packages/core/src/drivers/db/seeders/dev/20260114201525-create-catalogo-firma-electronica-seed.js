const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { CATALOGO_FIRMA_ELECTRONICA_TABLE } = require('../../models/catalogoFirmaElectronica');

const catalogoFirmaElectronicaCSV = path.join(__dirname, '../../CSVFiles/catalogo_firma_electronica.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const catalogoFirmaElectronicaJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(catalogoFirmaElectronicaCSV);

    return queryInterface.bulkInsert(
      CATALOGO_FIRMA_ELECTRONICA_TABLE,
      catalogoFirmaElectronicaJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CATALOGO_FIRMA_ELECTRONICA_TABLE, null, {});
  },
};
