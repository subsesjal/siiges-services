const fdaAdapter = require('./FDA/fda.db.adapters');
const fseAdapter = require('./FSE/fse.db.adapters');
const xmlAdapter = require('./XML/xml.db.adapters');

module.exports = {
  fdaAdapter,
  fseAdapter,
  xmlAdapter,
};
