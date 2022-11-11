const persona = {
  id: { type: 'integer' },
  nombre: { type: 'string' },
  apellidoPaterno: { type: 'string' },
  apellidoMaterno: { type: 'string' },
  fechaNacimiento: { type: 'string', format: 'date' },
  sexo: { type: 'string' },
  nacionalidad: { type: 'string' },
  telefono: { type: 'string' },
  celular: { type: 'string' },
  curp: { type: 'string', minLength: 18, maxLength: 18 },
  rfc: { type: 'string', minLength: 13, maxLength: 13 },
  ine: { type: 'string' },
  tituloCargo: { type: 'string' },
  fotografia: { type: 'string' },
};

const personaResponse = {
  ...persona,
  id: { type: 'integer' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
  deletedAt: { type: 'string', format: 'date-time' },
};

module.exports = {
  persona,
  personaResponse,
};
