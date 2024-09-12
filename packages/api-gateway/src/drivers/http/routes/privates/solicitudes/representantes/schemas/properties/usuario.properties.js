// Usuario
const usuario = {
  rolId: { type: 'integer' },
  usuario: { type: 'string', minLength: 3, maxLength: 25 },
  correo: { type: 'string', format: 'email' },
  estatus: { type: 'integer', minimum: 0, maximum: 1 },
  actualizado: { type: 'boolean' },
};

const usuarioResponse = {
  ...usuario,
  id: { type: 'integer' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
  deletedAt: { type: 'string', format: 'date-time' },
};

module.exports = {
  usuario,
  usuarioResponse,
};
