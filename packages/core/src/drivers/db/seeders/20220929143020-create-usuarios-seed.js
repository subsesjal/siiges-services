const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { USUARIO_TABLE } = require('../models/usuario');

const usuariosCSV = path.join(__dirname, '../CSVFiles/usuarios.csv');

module.exports = {
  async up(queryInterface) {
    const usuariosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(usuariosCSV);

    await queryInterface.bulkInsert(USUARIO_TABLE, usuariosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(USUARIO_TABLE, null, {});
  },
};
