// Domicilio
const domicilio = {
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

module.exports = { domicilio };
