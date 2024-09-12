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

const domicilioResponse = {
  ...domicilio,
  id: { type: 'integer' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
  deletedAt: { type: 'string', format: 'date-time' },
};

module.exports = {
  domicilio,
  domicilioResponse,
};
