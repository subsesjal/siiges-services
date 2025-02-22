const { updateSolicitudBeca } = require('./update.handlers.solicitud-beca.adapters');
const { createSolicitudBeca } = require('./create.handlers.solicitud-beca.adapters');
const { findAllSolicitudesBecas } = require('./find-all.handlers.solicitudes-becas.adapter');
const { findOneSolicitudBeca } = require('./find-one.handlers.solicitud-beca.adapter');
const { deleteSolicitudBeca } = require('./delete.handlers.solicitud-beca.adapters');

module.exports = {
  createSolicitudBeca,
  updateSolicitudBeca,
  findAllSolicitudesBecas,
  findOneSolicitudBeca,
  deleteSolicitudBeca,
};
