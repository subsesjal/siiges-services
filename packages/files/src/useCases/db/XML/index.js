const { xmlAdapter } = require('../../../adapters/db');
const { findFileXML } = require('./find-one.XML.db.use-cases');

module.exports = {
  findFileXML: findFileXML(
    xmlAdapter.findOneAlumnoQuery,
    xmlAdapter.createTituloElectronicoQuery,
  ),
};
