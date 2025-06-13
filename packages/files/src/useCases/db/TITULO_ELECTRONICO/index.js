const { xmlAdapter } = require('../../../adapters/db');
const { createFileXML } = require('./create.xml-file.db.use-cases');

module.exports = {
  createFileXML: createFileXML(
    xmlAdapter.findOneAlumnoTituloElectronicoQuery,
    xmlAdapter.findOneAlumnoQuery,
    xmlAdapter.createTituloElectronicoQuery,
    xmlAdapter.createAlumnoTituloElectronicoQuery,
  ),
};
