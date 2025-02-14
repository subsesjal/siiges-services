const { createSolicitudBeca } = require('./create.handlers.solicitud-beca.adapters');
const { findAllSolicitudBeca } = require('./find-all.handlers.solicitud-beca.adapter');

module.exports = {
  createSolicitudBeca,
  findAllSolicitudBeca,
};
