// Persona
const persona = {
  id: { type: 'integer' },
  domicilioId: { type: 'integer' },
  nombre: { type: 'string' },
  apellidoPaterno: { type: 'string' },
  apellidoMaterno: { type: 'string' },
  fechaNacimiento: { type: 'string', format: 'date-time' },
  sexo: { type: 'string' },
  nacionalidad: { type: 'string' },
  telefono: { type: 'string' },
  celular: { type: 'string' },
  curp: { type: 'string', minLength: 18, maxLength: 18 },
  rfc: { type: 'string', minLength: 13, maxLength: 13 },
  ine: { type: 'string' },
  correoPrimario: { type: 'string', format: 'email' },
  correoSecundario: { type: 'string', format: 'email' },
  tituloCargo: { type: 'string' },
  fotografia: { type: 'string' },
};

module.exports = { persona };
