const certificado = {
  id: { type: 'integer' },
  consecutivo: { type: 'integer' },
  nombreCompleto: { type: 'string' },
  matricula: { type: 'string' },
  folio: { type: ['string', 'null'] },
  foja: { type: ['string', 'null'] },
  libro: { type: ['string', 'null'] },
  fechaExpedicion: { type: ['string', 'null'] },
  fechaTerminacion: { type: ['string', 'null'] },
  folioDocumentoAlumnoId: { type: ['integer', 'null'] },
};

module.exports = { certificado };
