const fdaAdapter = require('./FDA/fda.db.adapters');
const fseAdapter = require('./FSE/fse.db.adapters');
const xmlAdapter = require('./XML/xml.db.adapters');
const foliosAdapter = require('./FOLIOS/folios.db.adapters');
const certitulosAdapter = require('./CERTITULO/certitulo.db.adapters');

module.exports = {
  fdaAdapter,
  fseAdapter,
  xmlAdapter,
  foliosAdapter,
  certitulosAdapter,
};
