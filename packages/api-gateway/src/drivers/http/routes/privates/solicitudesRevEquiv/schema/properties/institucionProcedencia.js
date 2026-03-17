const institucionProcedencia = {
  tipoInstitucionId: { type: 'integer' },
  estadoId: { type: 'integer' },
  paisId: { type: 'integer' },
  nivelId: { type: 'integer' },
  nombre: { type: 'string' },
  nombreCarrera: { type: 'string' },
  fechaInicio: { type: ['string'], format: 'date' },
  fechaFin: { type: ['string'], format: 'date' },
  telefono: { type: 'string' },
  paginaWeb: { type: 'string' },
  correo: { type: 'string' },
};

module.exports = { institucionProcedencia };
