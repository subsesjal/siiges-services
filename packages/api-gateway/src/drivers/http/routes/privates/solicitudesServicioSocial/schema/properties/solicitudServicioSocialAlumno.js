// Solicitud Servicio Social
const solicitudServicioSocialAlumno = {
  solicitudServicioSocialId: { type: 'integer' },
  alumnoId: { type: 'integer' },
  gradoId: { type: 'integer' },
  modalidadServicioSocialId: { type: 'integer' },
  sectorServicioSocialId: { type: 'integer' },
  ejeServicioSocialId: { type: 'integer' },
  lugarReceptor: { type: 'string' },
  fechaInicio: { type: 'string' }, // Cambio de date format
  fechaTermino: { type: 'string' }, // Cambio de date format
};

module.exports = { solicitudServicioSocialAlumno };
