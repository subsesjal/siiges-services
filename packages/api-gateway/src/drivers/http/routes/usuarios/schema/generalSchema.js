// Usuario
const usuario = {
  usuarioId: { type: 'integer' },
  id: { type: 'integer' },
  rolId: { type: 'integer' },
  usuario: { type: 'string', minLength: 3, maxLength: 25 },
  contrasena: { type: 'string', minLength: 8, maxLength: 25 },
  correo: { type: 'string', format: 'email' },
  estatus: { type: 'integer', minimum: 0, maximum: 1 },
  actualizado: { type: 'boolean' },
};

// Persona
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
  fotografia: { type: 'string' },
};

// Domicilio
const domicilio = {
  id: { type: 'integer' },
  municipioId: { type: 'integer' },
  estadoId: { type: 'integer' },
  calle: { type: 'string' },
  numeroExterior: { type: 'string' },
  numeroInterior: { type: 'string' },
  colonia: { type: 'string' },
  codigoPostal: { type: 'integer' },
  latitud: { type: 'string' },
  longitud: { type: 'string' },
};

// Estado
const estado = {
  id: { type: 'integer' },
  paisId: { type: 'integer' },
  estado: { type: 'string' },
};

// Municipio
const municipio = {
  id: { type: 'integer' },
  estadoId: { type: 'integer' },
  municipio: { type: 'string' },
};

// General
const general = {
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
  deletedAt: { type: 'string', format: 'date-time' },
};

module.exports = {
  usuario, persona, domicilio, estado, municipio, general,
};
