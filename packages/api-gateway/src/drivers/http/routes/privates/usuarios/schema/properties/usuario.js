// Usuario
const usuario = {
  rolId: { type: 'integer' },
  usuario: { type: 'string', minLength: 3, maxLength: 25 },
  correo: {
    type: 'string', format: 'email', minLength: 3, maxLength: 50,
  },
  estatus: { type: 'integer', minimum: 0, maximum: 1 },
  actualizado: { type: 'boolean' },
};

module.exports = { usuario };
