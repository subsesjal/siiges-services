const { xmlAdapter } = require('../../../adapters/db');
const { createFileXML } = require('./create.xml-file.db.use-cases');
const { findFileTitulo } = require('./find-one.titulo.db.use-cases');
const { GenerarTitulo } = require('../../../utils/pdfs');

module.exports = {
  createFileXML: createFileXML(
    xmlAdapter.findOneAlumnoTituloElectronicoQuery,
    xmlAdapter.findOneAlumnoQuery,
    xmlAdapter.createTituloElectronicoQuery,
    xmlAdapter.createAlumnoTituloElectronicoQuery,
  ),
  findFileTitulo: findFileTitulo(
    xmlAdapter.findOneAlumnoTituloElectronicoQuery,
    xmlAdapter.findOneFileQuery,
    GenerarTitulo,
  ),
};
