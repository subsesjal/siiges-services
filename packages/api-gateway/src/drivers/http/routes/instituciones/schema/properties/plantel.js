// Plantel
const plantel = {
  institucionId: { type: 'integer' },
  domicilioId: { type: 'integer' },
  tipoInmuebleId: { type: 'integer' },
  correo1: { type: 'string', format: 'email' },
  correo2: { type: 'string', format: 'email' },
  correo3: { type: 'string', format: 'email' },
  claveCentroTrabajo: { type: 'string' },
  telefono1: { type: 'string' },
  telefono2: { type: 'string' },
  telefono3: { type: 'string' },
  paginaWeb: { type: 'string' },
  redesSociales: { type: 'string' },
  especificaciones: { type: 'string' },
};

module.exports = { plantel };
