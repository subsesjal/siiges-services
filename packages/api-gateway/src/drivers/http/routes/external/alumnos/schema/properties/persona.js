// Persona
const persona = {
  nombre: { type: 'string' },
  apellidoPaterno: { type: 'string' },
  apellidoMaterno: { type: 'string' },
  fechaNacimiento: { type: 'string', format: 'date' },
  sexo: { type: 'string', enum: ['Masculino', 'Femenino'] },
  nacionalidad: { type: 'string', enum: ['Mexicana', 'Otro'] },
  telefono: { type: 'string', minLength: 10, maxLength: 10 },
  celular: { type: 'string', minLength: 10, maxLength: 10 },
  curp: { type: 'string', minLength: 18, maxLength: 18 },
  rfc: { type: 'string', minLength: 13, maxLength: 13 },
  correoPrimario: { type: 'string', format: 'email' },
};

module.exports = { persona };
