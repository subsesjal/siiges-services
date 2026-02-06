// Solicitud Folio Alumno
const solicitudFolioAlumno = {
  alumnoId: { type: 'integer' },
  solicitudFolioId: { type: 'integer' },
  modalidadTitulacionId: { type: 'integer' },
  fundamentoServicioSocialId: { type: 'integer' },
  cumplioServicioSocial: { type: 'boolean' },
  folioActa: { type: 'string' },
  fechaInicio: { type: 'string', format: 'date-time' },
  fechaTerminacion: { type: 'string', format: 'date-time' },
  // fechaExpedicion: { type: 'string', format: 'date-time' },
  fechaExamenProfesional: { type: 'string', format: 'date-time' },
};

module.exports = { solicitudFolioAlumno };
