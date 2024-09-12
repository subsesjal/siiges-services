// Notificacion
const notificacion = {
  usuarioId: { type: 'integer' },
  asunto: { type: 'string' },
  template: { type: 'string' },
  email: { type: 'string' },
  status: { type: 'string' },
  data: { type: 'string' },
  sentAt: { type: 'string', format: 'date-time' },
  openedAt: { type: 'string', format: 'date-time' },
};

module.exports = { notificacion };
