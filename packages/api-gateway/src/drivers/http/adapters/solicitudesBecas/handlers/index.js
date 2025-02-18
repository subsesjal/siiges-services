const { createSolicitudBeca } = require('./create.handlers.solicitud-beca.adapters');
const { findAllSolicitudBeca } = require('./find-all.handlers.solicitud-beca.adapter');
const { findOneSolicitudBeca } = require('./find-one.handlers.solicitud-becas.adapter');

module.exports = {
  createSolicitudBeca,
  findAllSolicitudBeca,
  findOneSolicitudBeca,
};
