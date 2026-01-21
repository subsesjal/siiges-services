// Titulo Electronico
const tituloElectronico = {
  institucionId: { type: 'integer' },
  estadoId: { type: 'integer' },
  cargoId: { type: 'integer' },
  autorizacionReconocimientoId: { type: 'integer' },
  modalidadTitulacionId: { type: 'integer' },
  estadoAntecedenteId: { type: 'integer' },
  fundamentoLegalServicioSocialId: { type: 'integer' },
  tipoEstudioAntecedenteId: { type: 'integer' },
  version: { type: 'string' },
  folioControl: { type: 'string' },
  nombreResponsable: { type: 'string' },
  primerApellidoResponsable: { type: 'string' },
  segundoApellidoResponsable: { type: 'string' },
  curpResponsable: { type: 'string' },
  sello: { type: 'string' },
  certificadoResponsable: { type: 'string' },
  noCertificadoResponsable: { type: 'string' },
  nombreInstitucion: { type: 'string' },
  cveInstitucion: { type: 'string' },
  cveCarrera: { type: 'string' },
  nombreCarrera: { type: 'string' },
  fechaInicio: { type: 'string' }, // Cambio de date format
  fechaTerminacion: { type: 'string' }, // Cambio de date format
  numeroRvoe: { type: 'string' },
  curp: { type: 'string' },
  nombre: { type: 'string' },
  primerApellido: { type: 'string' },
  segundoApellido: { type: 'string' },
  correoElectronico: { type: 'string' },
  fechaExpedicion: { type: 'string' }, // Cambio de date format
  fechaExamenProfesional: { type: 'string' }, // Cambio de date format
  fechaExencionExamenProfesional: { type: 'string' }, // Cambio de date format
  cumplioServicioSocial: { type: 'integer' },
  institucionProcedencia: { type: 'string' },
  fechaInicioAntecedente: { type: 'string' }, // Cambio de date format
  fechaTerminacionAntecedente: { type: 'string' }, // Cambio de date format
  noCedula: { type: 'string', nullable: true },
  folioDigital: { type: 'string' },
  fechaAutenticacion: { type: 'string', format: 'date-time' },
  selloTitulo: { type: 'string' },
  noCertificadoAutoridad: { type: 'string' },
  selloAutenticacion: { type: 'string' },
};

module.exports = { tituloElectronico };
